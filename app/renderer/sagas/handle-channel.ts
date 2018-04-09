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
  parseJoinMessage,
  parseQuitMessage,
  parsePartMessage,
  parseKickMessage,
  parseKillMessage
} from '../models'
import { getConnection, getChannelByName } from './selectors'

function raw(
  client: IRC.Client,
  connection: Connection,
  channel: Channel,
  message: IRC.IMessage
) {}
//as you add listeners for specific things add the string that would appear as the command string in message
//by adding to this list the raw listener won't log the message type.
const raw_no_log = [
  'KICK',
  'PART',
  'KILL',
  'QUIT',
  'JOIN',
  'NOTICE',
  'PRIVMSG',
  'NICK',
  'PONG'
]

function subscribe(
  client: IRC.Client,
  connection: Connection,
  channel: Channel
) {
  return eventChannel(emit => {
    //raw
    client.addListener('raw', (message: IRC.IMessage) => {
      const ms = JSON.parse(JSON.stringify(message)) //turns to hash
      //if the raw message is associated with a channel the channel name is the first elementin args
      var channel2
      if (ms['args'][0][0] == '#') {
        channel2 = ms['args'][0]
      } else {
        channel2 = '#'
      }
      // We receive a message on a channel
      if (channel2 == channel.name && !raw_no_log.includes(message.command)) {
        console.log(JSON.stringify(message))
        // var re = /^[0-9]+$/
        // if (re.exec(message.rawCommand)) {
        //   //there isn's an event in node-irc that handles all numerical replies
        //   if (ms['rawCommand'] == '433') {
        //     //TODO maybe:change nick in store?
        //   }
        var sender = ''
        if (ms.hasOwnProperty('nick')) {
          sender = ms['nick']
        } else if (ms.hasOwnProperty('server')) {
          sender = ms['server']
        }
        //emmits generic messages
        emit(
          actions.appendLog(
            connection.id,
            channel.id,
            parseNumericMessage(ms['server'], message)
          )
        )
        //   }
        // }else{
        //   emit(
        //     actions.appendLog(
        //       connection.id,
        //       channel.id,
        //       parseoOtherMessage(ms['server'], message)
        //     )
        //   )
      }
    })
    //kick
    client.addListener(
      'kick',
      (
        ichannel: IRC.IChannel,
        nick: string,
        by: string,
        reason: string,
        message: IRC.IMessage
      ) => {
        if (ichannel.toString() == channel.name) {
          emit(
            actions.appendLog(
              connection.id,
              channel.id,
              parseKickMessage(nick, by, reason, channel.name)
            )
          )
        }
      }
    )

    //part
    client.addListener(
      'part',
      (
        ichannel: IRC.IChannel,
        nick: string,
        reason: string,
        message: IRC.IMessage
      ) => {
        if (ichannel.toString() == channel.name) {
          emit(
            actions.appendLog(
              connection.id,
              channel.id,
              parsePartMessage(nick, reason, channel.name)
            )
          )
        }
      }
    )

    //kill
    client.addListener(
      'kill',
      (
        nick: string,
        reason: string,
        channels: string[],
        message: IRC.IMessage
      ) => {
        if (channels.includes(channel.name) || channel.name == '#') {
          emit(
            actions.appendLog(
              connection.id,
              channel.id,
              parseKillMessage(nick, reason)
            )
          )
        }
      }
    )

    //quit
    client.addListener(
      'quit',
      (
        nick: string,
        reason: string,
        channels: string[],
        message: IRC.IMessage
      ) => {
        if (channels.includes(channel.name) || channel.name == '#') {
          emit(
            actions.appendLog(
              connection.id,
              channel.id,
              parseQuitMessage(nick, reason)
            )
          )
        }
      }
    )

    //join
    client.addListener(
      'join',
      (ichannel: IRC.IChannel, nick: string, message: IRC.IMessage) => {
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

    //notice
    client.addListener(
      'notice',
      (nick: string, to: string, text: string, message: IRC.IMessage) => {
        if (to == channel.name || (to[0] != '#' && '#' == channel.name)) {
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
    //TODO: PRIV MESSAGE user 2 user

    //channel messages
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

    //nick
    client.addListener(
      'nick',
      (
        oldnick: string,
        newnick: string,
        channels: string[],
        message: IRC.IMessage
      ) => {
        // Someone changed their nickname
        if (
          channels.includes(channel.name) ||
          (channel.name == '#' && newnick == client.nick)
        ) {
          emit(
            actions.appendLog(
              connection.id,
              channel.id,
              parseNickChange(oldnick, newnick, channels, message)
            )
          )
        }
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

const joinRegex = /^\/join\s*(#.+)$/

const nickRegex = /^\/nick\s*([a-zA-Z0-9_\-]+)$/
const cmdRegex = /^\/[a-z]+/i
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
      const cmdResults = cmdRegex.exec(payload.message)
      if (nickResults) {
        const newNickName = nickResults[1]
        client.send('nick', newNickName)
        //yield put(actions.joinChannel(connection.id, newNickName))
      } else if (joinResults) {
        const newChanName = joinResults[1]
        yield put(actions.joinChannel(connection.id, newChanName))
      } else if (cmdResults) {
        const args = payload.message.split(' ')
        client.send(args[0].slice(1), ...args.slice(1))
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
