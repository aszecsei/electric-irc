import { call, fork, put, select, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as IRC from 'irc'

import * as actions from '../actions'
import {
  ChannelFactory,
  Guid,
  Connection,
  Channel,
  parseMessage,
  parseNickChange,
  parseNumericMessage,
  parseNoticeMessage,
  parseJoinMessage
} from '../models'
import { getConnection, getChannelByName } from './selectors'

function subscribe(
  client: IRC.Client,
  connection: Connection,
  channel: Channel
) {
  return eventChannel(emit => {
    client.addListener('raw', (message: IRC.IMessage) => {
      // We receive a message on a channel
      if ('#' == channel.name) {
        const ms = JSON.parse(JSON.stringify(message))
        console.log(JSON.stringify(message))
        var re = /^[0-9]+$/
        if (re.exec(message.rawCommand)) {
          //there isn's an event in node-irc that handles all numerical replies
          if (ms['rawCommand'] == '433') {
            //TODO:change nick
          }
          emit(
            actions.appendLog(
              connection.id,
              channel.id,
              parseNumericMessage(ms['server'], message)
            )
          )
        }
      }
    })
    client.addListener(
      'join',
      (ichannel: IRC.IChannel, nick: string, message: Irc.IMessage) => {
        if (ichannel.toString() == channel.name) {
          emit(
            actions.appendLog(
              connection.id,
              channel.id,
              parseJoinMessage(nick, channel.name)
            )
          )
        }
      }
    )
    client.addListener(
      'notice',
      (nick: string, to: string, text: string, message: IRC.IMessage) => {
        if (to == channel.name || (to[0] != '#' && '#' == channel.name)) {
          // console.log(nick)
          // console.log(to)
          // console.log(text)
          // console.log(message)
          // console.log(channel)
          // console.log(connection)
          var sender = ''
          if (nick) {
            sender = nick
          } else {
            const ms = JSON.parse(JSON.stringify(message))
            sender = ms['server']
          }
          emit(
            actions.appendLog(
              connection.id,
              channel.id,
              parseNoticeMessage(sender, to, message)
            )
          )
        }
      }
    )
    client.addListener(
      'message#',
      (nick: string, to: string, text: string, message: IRC.IMessage) => {
        console.log(`${nick} says ${text} to ${to}!`)
        // We receive a message on a channel
        if (to == channel.name) {
          emit(
            actions.appendLog(
              connection.id,
              channel.id,
              parseMessage(nick, to, text, message)
            )
          )
        }
      }
    )
    client.addListener(
      'nick',
      (
        oldnick: string,
        newnick: string,
        channels: string[],
        message: IRC.IMessage
      ) => {
        // Someone changed their nickname
        if (channels.includes(channel.name)) {
          emit(
            actions.appendLog(
              connection.id,
              channel.id,
              parseNickChange(oldnick, newnick, channels, message)
            )
          )
          if (newnick == client.nick) {
            // console.log("****************")
            // console.log(oldnick)
            // console.log(newnick)
            // console.log(client)
            // console.log("****************")
            emit(actions.changeNick(connection.id, newnick))
          }
        }
        // TODO: Check if we're the ones whose nickname changed
      }
    )

    return () => {}
  })
}

export function* read(
  client: IRC.Client,
  connection: Connection,
  channel: Channel
) {
  const eventChannel = yield call(subscribe, client, connection, channel)
  while (true) {
    let action = yield take(eventChannel)
    yield put(action)
  }
}

const joinRegex = new RegExp(/^\/join\s*(#.+)$/)

const nickRegex = new RegExp(/^\/nick\s*([a-zA-Z0-9_\-]+)$/)
export function* write(
  client: IRC.Client,
  connection: Connection,
  channel: Channel
) {
  while (true) {
    const payload: actions.ISendMessageAction = yield take(
      actions.ActionTypeKeys.SEND_MESSAGE
    )
    if (payload.serverId == connection.id && payload.channelId == channel.id) {
      // TODO: Intercept all '/command's
      const joinResults = joinRegex.exec(payload.message)
      const nickResults = nickRegex.exec(payload.message)
      if (nickResults) {
        const newNickName = nickResults[1]
        client.send('nick', newNickName)
        //yield put(actions.joinChannel(connection.id, newNickName))
      } else if (joinResults) {
        const newChanName = joinResults[1]
        yield put(actions.joinChannel(connection.id, newChanName))
      } else {
        // Send the message
        client.say(channel.name, payload.message)
        // TODO: Retrieve current nickname?
        // Alt solution: have special value for appending own messages
        //console.log(client)
        yield put(
          actions.appendLog(
            connection.id,
            channel.id,
            //parseMessage(connection.nickname, channel.name, payload.message)
            parseMessage(client.nick, channel.name, payload.message)
          )
        )
      }
    }
  }
}

export function* handleChannel(
  client: IRC.Client,
  connection: Connection,
  channel: Channel
) {
  yield fork(read, client, connection, channel)
  yield fork(write, client, connection, channel)
}

export function* handleJoinChannels(client: IRC.Client, serverId: Guid) {
  while (true) {
    let payload: actions.IJoinChannelAction = yield take(
      actions.ActionTypeKeys.JOIN_CHANNEL
    )
    const newChannel = ChannelFactory({
      id: Guid.create(),
      name: payload.channelName
    })
    yield put(actions.addChannel(serverId, newChannel))
    let conn: Connection = yield select(getConnection, serverId)
    yield fork(handleChannel, client, conn, newChannel)

    // TODO: Handle this as an event emitter
    client.join(payload.channelName, () => {
      // TODO: Action to mark channel as 'connected'
    })
  }
}
