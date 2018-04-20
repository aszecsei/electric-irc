import { List } from 'immutable'
import { ElectricState } from '../store'
import { IMergeLogsAction } from '../actions'
import {
  Message,
  MessageFactory,
  parseJoinMessage,
  parseKickMessage,
  parseKillMessage,
  parseMessage,
  // parseNickChange, server currently doesn't save nick change messages
  parsePartMessage,
  parseQuitMessage,
  MessageType
} from '../models'
import { print } from 'util'

import { replace } from '../utilities/replace'

function whichType(jmessage: any): Message {
  switch (jmessage.command) {
    case 'PRIVMSG':
      return parseMessage(
        jmessage.sender,
        jmessage.channel_name,
        jmessage.message,
        undefined,
        new Date(jmessage.sent)
      )
    case 'PART':
      return parsePartMessage(
        jmessage.sender,
        jmessage.channel_name,
        undefined,
        new Date(jmessage.sent)
      )
    case 'JOIN':
      return parseJoinMessage(
        jmessage.sender,
        jmessage.channel_name,
        new Date(jmessage.sent)
      )
    case 'QUIT':
      return parseQuitMessage(
        jmessage.sender,
        undefined,
        new Date(jmessage.sent)
      )
    case 'KICK':
      return parseKickMessage(
        jmessage.sender,
        'someone',
        jmessage.channel_name,
        undefined,
        new Date(jmessage.sent)
      )
    case 'KILL':
      return parseKillMessage(
        jmessage.sender,
        undefined,
        new Date(jmessage.sent)
      )
    default:
      return new MessageFactory()
  }
}
function transformMessage(json: any[]): List<Message> {
  let list = List<Message>()
  json.map(v => {
    list = list.push(whichType(v))
  })
  return list
}

function merge(log: List<Message>, servlog: List<Message>) {
  for (let i = 0; i < log.size; i++) {
    // filter out duplicates O(n*m)
    const m = log.get(i)
    if (m) {
      servlog = servlog.filter(m2 => {
        const a = m.sent.getTime() - 5000 <= m2.sent.getTime()
        const b = m2.sent.getTime() <= m.sent.getTime() + 5000
        const c = m.sender === m2.sender
        const d = m.type === m2.type
        const e =
          (m.type === MessageType.MESSAGE && m.text === m2.text) ||
          m2.type !== MessageType.MESSAGE
        return !(a && b && c && d && e)
      })
    }
  }

  log = log.sort((m1: Message, m2: Message) => {
    if (m1.sent.getTime() < m2.sent.getTime()) {
      return -1
    } else if (m1.sent.getTime() > m2.sent.getTime()) {
      return 1
    } else {
      return 0
    }
  })
  servlog = servlog.sort((m1: Message, m2: Message) => {
    if (m1.sent.getTime() < m2.sent.getTime()) {
      return -1
    } else if (m1.sent.getTime() > m2.sent.getTime()) {
      return 1
    } else {
      return 0
    }
  })

  let newLog = List<Message>()
  while (!(log.isEmpty() && servlog.isEmpty())) {
    const servLogFirst = servlog.first()
    const logFirst = log.first()
    if (log.isEmpty()) {
      newLog = newLog.push(servlog.first())
      servlog = servlog.slice(1)
    } else if (servlog.isEmpty()) {
      newLog = newLog.push(log.first())
      log = log.slice(1)
    } else if (log.first().sent <= servlog.first().sent) {
      newLog = newLog.push(log.first())
      log = log.slice(1)
    } else {
      newLog = newLog.push(servlog.first())
      servlog = servlog.slice(1)
    }
  }
  return newLog
}
export default function mergeLog(
  state: ElectricState,
  action: IMergeLogsAction
): ElectricState {
  const conn = state.connections.find(value => {
    return value.id === action.serverId
  })
  if (conn) {
    const chan = conn.channels.find(value => {
      return value.id === action.channelId
    })
    if (chan) {
      const newChan = chan.set(
        'log',
        merge(chan.log, transformMessage(action.json))
      )
      const newConn = conn.set(
        'channels',
        replace(conn.channels, chan, newChan)
      )
      const newState = state.set(
        'connections',
        replace(state.connections, conn, newConn)
      )
      return newState
    }
  }
  return state
}
