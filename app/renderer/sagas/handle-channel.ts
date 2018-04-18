import { call, fork, put, select, take } from 'redux-saga/effects'
import * as sagas from 'redux-saga'
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
import { getConnection } from './selectors'

// as you add listeners for specific things add the string that would appear as the command string in message
// by adding to this list the raw listener won't log the message type.
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

export function subscribe(
  client: IRC.Client,
  connection: Connection,
  channel: Channel
) {
  return sagas.eventChannel(emit => {
    // raw
    client.addListener('raw', (message: IRC.IMessage) => {
      // print('raw\n')
      const ms = JSON.parse(JSON.stringify(message)) // turns to hash
      // if the raw message is associated with a channel the channel name is the first elementin args
      const channel2 = ms.args[0][0] === '#' ? ms.args[0] : '#'
      // We receive a message on a channel
      if (channel2 === channel.name && !raw_no_log.includes(message.command)) {
        const sender = ms.hasOwnProperty('nick')
          ? ms.nick
          : ms.hasOwnProperty('server') ? ms.server : ''
        // emits generic messages
        emit(
          actions.appendLog(
            connection.id,
            channel.id,
            parseNumericMessage(sender, message)
          )
        )
      }
    })
    // kick
    client.addListener(
      'kick',
      (
        ichannel: IRC.IChannel,
        nick: string,
        by: string,
        reason: string,
        message: IRC.IMessage
      ) => {
        if (ichannel.toString() === channel.name) {
          emit(
            actions.appendLog(
              connection.id,
              channel.id,
              parseKickMessage(nick, by, channel.name, reason)
            )
          )
        }
      }
    )

    // part
    client.addListener(
      'part',
      (
        ichannel: IRC.IChannel,
        nick: string,
        reason: string,
        message: IRC.IMessage
      ) => {
        if (ichannel.toString() === channel.name) {
          emit(
            actions.appendLog(
              connection.id,
              channel.id,
              parsePartMessage(nick, channel.name, reason)
            )
          )
        }
      }
    )

    // kill
    client.addListener(
      'kill',
      (
        nick: string,
        reason: string,
        channels: string[],
        message: IRC.IMessage
      ) => {
        if (channels.includes(channel.name) || channel.name === '#') {
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

    // quit
    client.addListener(
      'quit',
      (
        nick: string,
        reason: string,
        channels: string[],
        message: IRC.IMessage
      ) => {
        if (channels.includes(channel.name) || channel.name === '#') {
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

    // join
    client.addListener(
      'join',
      (ichannel: IRC.IChannel, nick: string, message: IRC.IMessage) => {
        if (nick === client.nick && channel.name === '#') {
          emit(actions.joinChannel(connection.id, ichannel.toString()))
        }
        if (ichannel.toString() === channel.name) {
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

    // notice
    client.addListener(
      'notice',
      (nick: string, to: string, text: string, message: IRC.IMessage) => {
        if (to === channel.name || (to[0] !== '#' && '#' === channel.name)) {
          const ms = JSON.parse(JSON.stringify(message))
          const sender = nick ? nick : ms.server
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
    // TODO: PRIV MESSAGE user 2 user

    // channel messages
    client.addListener(
      'message#',
      (nick: string, to: string, text: string, message: IRC.IMessage) => {
        // print('message\n')
        // console.log(`${nick} says ${text} to ${to}!`)
        // We receive a message on a channel
        if (to === channel.name) {
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

    // nick
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
          (channel.name === '#' && newnick === client.nick)
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

    return () => null
  })
}

export function* read(
  client: IRC.Client,
  connection: Connection,
  channel: Channel
) {
  const evChannel = yield call(subscribe, client, connection, channel)
  for (;;) {
    const action = yield take(evChannel)
    yield put(action)
  }
}

const joinRegex = /^\/join\s*(#.+)$/

const nickRegex = /^\/nick\s*([a-zA-Z0-9_\-]+)$/
const cmdRegex = /^\/[a-z]+/i
export function* insideWrite(
  client: IRC.Client,
  connection: Connection,
  channel: Channel,
  payload: actions.ISendMessageAction
) {
  if (payload.serverId === connection.id && payload.channelId === channel.id) {
    // TODO: Intercept all '/command's
    const joinResults = joinRegex.exec(payload.message)
    const nickResults = nickRegex.exec(payload.message)
    const cmdResults = cmdRegex.exec(payload.message)
    if (nickResults) {
      const newNickName = nickResults[1]
      client.send('nick', newNickName)
    } else if (joinResults) {
      const newChanName = joinResults[1]
      client.join(newChanName)
      //yield put(actions.joinChannel(connection.id, newChanName))
    } else if (cmdResults) {
      const args = payload.message.split(' ')
      client.send(args[0].slice(1), ...args.slice(1))
    } else {
      // Send the message
      client.say(channel.name, payload.message)
      yield put(
        actions.appendLog(
          connection.id,
          channel.id,
          parseMessage(client.nick, channel.name, payload.message)
        )
      )
    }
  }
}
export function* write(
  client: IRC.Client,
  connection: Connection,
  channel: Channel
) {
  for (;;) {
    const payload: actions.ISendMessageAction = yield take(
      actions.ActionTypeKeys.SEND_MESSAGE
    )
    yield call(insideWrite, client, connection, channel, payload)
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
  for (;;) {
    const payload: actions.IJoinChannelAction = yield take(
      actions.ActionTypeKeys.JOIN_CHANNEL
    )
    const newChannel = ChannelFactory({
      id: Guid.create(),
      name: payload.channelName
    })
    yield put(actions.addChannel(serverId, newChannel))
    const conn: Connection = yield select(getConnection, serverId)
    yield fork(handleChannel, client, conn, newChannel)
    yield fork(requestServer, conn, newChannel)
    // TODO: Handle this as an event emitter
    // client.join(payload.channelName, () => {
    //   // TODO: Action to mark channel as 'connected'
    // })
  }
}
export function* requestServer(connection: Connection, channel: Channel) {
  var xhttp2 = new XMLHttpRequest()
  xhttp2.open(
    'GET',
    'https://electric-centric.herokuapp.com/server/join?server=' +
      connection.url +
      '&channel=%23' +
      channel.name.slice(1),
    true
  )
  xhttp2.send()
  var xhttp = new XMLHttpRequest()
  xhttp.open(
    'GET',
    'https://electric-centric.herokuapp.com/message?servers=' +
      connection.url +
      '&channels=%23' +
      channel.name.slice(1),
    false
  )
  xhttp.send()
  const messages = JSON.parse(xhttp.responseText)
  if (messages['status'] == 203) {
    yield put(actions.mergeLog(connection.id, channel.id, messages['message']))
  }
}
