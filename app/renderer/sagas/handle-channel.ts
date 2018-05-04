import { call, fork, put, select, take } from 'redux-saga/effects'
import * as sagas from 'redux-saga'
import * as IRC from 'irc'
import { List } from 'immutable'

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
  parseKillMessage,
  Settings
} from '../models'
import { getConnection,getSettings, getChannelByName } from './selectors'
import * as persistentStorage from '../utilities/persistent-storage'

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

export function* subscribeToRaw(client: IRC.Client, connection: Connection, channel: Channel) {
  const evChan = sagas.eventChannel(emit => {
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
            parseNumericMessage(sender, message,sender===client.nick)
          )
        )
      }
    })
    return () => {
      client.removeListener('raw', () => null)
    }
  })
  for (;;) {
    const action = yield take(evChan)
    yield put(action)
  }
}

export function* subscribeToKick(client: IRC.Client, connection: Connection, channel: Channel) {
  const evChan = sagas.eventChannel(emit => {
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
              parseKickMessage(nick, by, channel.name, reason,new Date(),(nick===client.nick||by===client.nick))
            )
          )
        }
      }
    )
    return () => {
      client.removeListener('kick', () => null)
    }
  })
  for (;;) {
    const action = yield take(evChan)
    yield put(action)
  }
}

export function* subscribeToPart(client: IRC.Client, connection: Connection, channel: Channel) {
  const evChan = sagas.eventChannel(emit => {
    client.addListener(
      'part',
      (
        ichannel: IRC.IChannel,
        nick: string,
        reason: string,
        message: IRC.IMessage
      ) => {
        if (ichannel.toString() === channel.name) {
          if(client.nick===nick){
            emit(actions.partChannel(connection.id,channel))
          }
          emit(
            actions.appendLog(
              connection.id,
              channel.id,
              parsePartMessage(nick, channel.name, reason,new Date(),client.nick===nick)
            )
          )
        }
      }
    )
    return () => {
      client.removeListener('part', () => null)
    }
  })
  for (;;) {
    const action = yield take(evChan)
    yield put(action)
  }
}

export function* subscribeToKill(client: IRC.Client, connection: Connection, channel: Channel) {
  const evChan = sagas.eventChannel(emit => {
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
              parseKillMessage(nick, reason,new Date(),client.nick===nick)
            )
          )
        }
      }
    )
    return () => {
      client.removeListener('kill', () => null)
    }
  })
  for (;;) {
    const action = yield take(evChan)
    yield put(action)
  }
}

export function* subscribeToQuit(client: IRC.Client, connection: Connection, channel: Channel) {
  const evChan = sagas.eventChannel(emit => {
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
              parseQuitMessage(nick, reason,new Date(),client.nick===nick)
            )
          )
        }
      }
    )
    return () => {
      client.removeListener('quit', () => null)
    }
  })
  for (;;) {
    const action = yield take(evChan)
    yield put(action)
  }
}

export function* subscribeToJoin(client: IRC.Client, connection: Connection, channel: Channel) {
  const evChan = sagas.eventChannel(emit => {
    client.addListener(
      'join',
      (ichannel: IRC.IChannel, nick: string, message: IRC.IMessage) => {
        if (nick === client.nick && channel.name === '#') {
          console.log(`Joined ${ichannel.toString()}`)
          emit({ type: 'JOIN_OR_MAKE_CONNECTED', data: ichannel.toString() })
        } else if (ichannel.toString() === channel.name) {
          emit(
            { type: 'APPEND_LOG', data: 
            actions.appendLog(
              connection.id,
              channel.id,
              parseJoinMessage(nick, channel.name,new Date(),client.nick===nick)
            ) }
          )
        }
      }
    )
    return () => {
      client.removeListener('join', () => null)
    }
  })
  for (;;) {
    const action = yield take(evChan)
    if (action.type === 'APPEND_LOG') {
      yield put(action.data)
    } else {
      // Check if the channel already exists
      const chann = yield select(getChannelByName, connection.id, action.data)
      if (chann) {
        // Make the channel connected
        yield put(actions.makeChannelConnected(connection.id, chann.id))
      } else {
        // Create the channel
        yield put(actions.joinChannel(connection.id, action.data))
      }
    }
  }
}

export function* subscribeToNotice(client: IRC.Client, connection: Connection, channel: Channel) {
  const evChan = sagas.eventChannel(emit => {
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
              parseNoticeMessage(sender, to, message,client.nick===nick)
            )
          )
        }
      }
    )
    return () => {
      client.removeListener('notice', () => null)
    }
  })
  for (;;) {
    const action = yield take(evChan)
    yield put(action)
  }
}

export function* subscribeToChannelMessage(client: IRC.Client, connection: Connection, channel: Channel) {
  const evChan = sagas.eventChannel(emit => {
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
              parseMessage(nick, to, text)
            )
          )
        }
      }
    )
    return () => {
      client.removeListener('message#', () => null)
    }
  })
  for (;;) {
    const action = yield take(evChan)
    yield put(action)
  }
}

export function* subscribeToNick(client: IRC.Client, connection: Connection, channel: Channel) {
  const evChan = sagas.eventChannel(emit => {
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
              parseNickChange(oldnick, newnick, channels,new Date(),newnick === client.nick)
            )
          )
        }
      }
    )
    return () => {
      client.removeListener('nick', () => null)
    }
  })
  for (;;) {
    const action = yield take(evChan)
    yield put(action)
  }
}

export function* read(
  client: IRC.Client,
  connection: Connection,
  channel: Channel
) {
  yield fork(subscribeToRaw, client, connection, channel)
  yield fork(subscribeToKick, client, connection, channel)
  yield fork(subscribeToPart, client, connection, channel)
  yield fork(subscribeToKill, client, connection, channel)
  yield fork(subscribeToQuit, client, connection, channel)
  yield fork(subscribeToJoin, client, connection, channel)
  yield fork(subscribeToNotice, client, connection, channel)
  yield fork(subscribeToChannelMessage, client, connection, channel)
  yield fork(subscribeToNick, client, connection, channel)
}

const joinRegex = /^\/join\s*(#.+)$/i
const partRegex=/^\/part\s*(\s(#[^\s]+)(\s+(.+))?)?$/i
const quitRegex=/^\/quit\s*(\s(.+))?$/i
const nickRegex = /^\/nick\s*([a-zA-Z0-9_\-]+)$/i
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
    const partResults = partRegex.exec(payload.message)
    const quitResults = quitRegex.exec(payload.message)
    if (nickResults) {
      const newNickName = nickResults[1]
      client.send('nick', newNickName)
    } else if (quitResults) {
      yield put(actions.removeServer(payload.serverId))// the quit listener doesn't trigger when we 'diconnect'
      // console.log(quitResults)
      const set:Settings=yield select(getSettings)
      let qmess=set.defquit
      if(quitResults[2]){
        qmess=quitResults[2]
      }
      // console.log(client)
      client.disconnect(qmess,()=>null)
    } else if (partResults) {
      // console.log(partResults)
      let pchann=channel.name
      if(partResults[2]){
        pchann=partResults[2]
      }
      const set:Settings=yield select(getSettings)
      let pmess=set.defleave
      if(partResults[4]){
        pmess=partResults[4]
      }
      client.part(pchann,pmess,()=>null)
    } else if (joinResults) {
      const newChanName = joinResults[1]
      client.join(newChanName)
      // yield put(actions.joinChannel(connection.id, newChanName))
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
          parseMessage(client.nick, channel.name, payload.message,new Date(),true)
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
export function* handlePartChannels(client: IRC.Client, serverId: Guid) {
  for (;;) {
    const payload: actions.IPartChannelAction = yield take(
      actions.ActionTypeKeys.PART_CHANNEL
    )
    if (payload.serverId === serverId) {
      const set:Settings=yield select(getSettings)
      client.part(payload.channel.name,set.defleave,()=>null)
      yield put(actions.removeChannel(serverId,payload.channel.id))
    }
  }
}
// maybe push up another arg to here to see if connected?
export function* handleJoinChannels(client: IRC.Client, serverId: Guid) {
  for (;;) {
    const payload: actions.IJoinChannelAction = yield take(
      actions.ActionTypeKeys.JOIN_CHANNEL
    )
    if (payload.serverId === serverId) {
      // Make sure we have the right server
      const connection: Connection = yield select(getConnection, serverId)
      if (!connection.channels.find(value => value.name === payload.channelName)) {
        // Prevent joining duplicate channels
        const newChannel = new ChannelFactory({
          id: Guid.create(),
          name: payload.channelName
        })
        // Add the channel model to the store
        yield put(actions.addChannel(serverId, newChannel))
        // Handle channel events
        yield fork(handleChannel, client, connection, newChannel)
        // Get the local channel logs
        yield fork(loadLogs, connection, newChannel)
        // Get the server message log
        yield fork(requests, connection, newChannel)
        
        if (!client.chans[payload.channelName] && payload.channelName) {
          // Actually join the channel if we haven't already
          client.join(payload.channelName)
        } else {
          // We've already connected, so mark us connected
          yield put(actions.makeChannelConnected(serverId, newChannel.id))
        }
      }
    }
  }
}

export function* loadLogs(connection: Connection, channel: Channel) {
  const evChannel = sagas.eventChannel(emit => {
    persistentStorage.loadLogs(connection, channel).then(
      (actionList: List<actions.IAppendLogAction>) => {
        actionList.forEach((value) => {
          emit(value)
        })
      }
    ).catch()
    return () => null
  })
  for (;;) {
    const action: actions.IAppendLogAction = yield take(evChannel)
    yield put(action)
  }
}

export function* requests(
  connection: Connection,
  channel: Channel
) {
  const evChannel = yield call(requestServer, connection, channel)
  const action = yield take(evChannel)
  yield put(action)
}

export function requestServer(connection: Connection, channel: Channel) {
  return sagas.eventChannel(emit=>{
    const xhttp2 = new XMLHttpRequest()
    xhttp2.open(
      'GET',
      `https://electric-centric.herokuapp.com/server/join?server=${
        connection.url
      }&channel=%23${channel.name.slice(1)}`,
      true
    )
    xhttp2.send()
    const xhttp = new XMLHttpRequest()
    xhttp.open(
      'GET',
      `https://electric-centric.herokuapp.com/message?servers=${
        connection.url
      }&channels=%23${channel.name.slice(1)}`,
      true
    )
    xhttp.onreadystatechange=function() {
      if (this.readyState === 4 && this.status === 200) {
        const messages = JSON.parse(this.responseText)
        if (messages.status === 203) {
          emit(actions.mergeLog(connection.id, channel.id, messages.message))
        }
      }
    }
    xhttp.send()
    return () => null
  })
}
