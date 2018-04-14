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
  //parseNickChange, server currently doesn't save nick change messages
  parsePartMessage,
  parseQuitMessage,
  MessageType
} from '../models'
import { print } from 'util'

function replace<K>(list: List<K>, oldElement: K, newElement: K) {
  const oldIndex = list.indexOf(oldElement)
  if (oldIndex !== -1) {
    return list.set(oldIndex, newElement)
  } else {
    return list
  }
}
function whichType(jmessage: any): Message {
  switch (jmessage['command']) {
    case 'PRIVMSG':
      return parseMessage(
        jmessage['sender'],
        jmessage['channel_name'],
        jmessage['message'],
        undefined,
        new Date(jmessage['sent'])
      )
    case 'PART':
      return parsePartMessage(
        jmessage['sender'],
        jmessage['channel_name'],
        undefined,
        new Date(jmessage['sent'])
      )
    case 'JOIN':
      return parseJoinMessage(
        jmessage['sender'],
        jmessage['channel_name'],
        new Date(jmessage['sent'])
      )
    case 'QUIT':
      return parseQuitMessage(
        jmessage['sender'],
        undefined,
        new Date(jmessage['sent'])
      )
    case 'KICK':
      return parseKickMessage(
        jmessage['sender'],
        'someone',
        jmessage['channel_name'],
        undefined,
        new Date(jmessage['sent'])
      )
    case 'KILL':
      return parseKillMessage(
        jmessage['sender'],
        undefined,
        new Date(jmessage['sent'])
      )
    default:
      return new MessageFactory()
  }
}
function transformMessage(json: any[]): List<Message> {
  var list = List<Message>()
  json.map(v => {
    list = list.push(whichType(v))
  })
  return list
}

function merge(log: List<Message>, servlog: List<Message>) {
  var i = 0
  while (i < log.size) {
    //filter out duplicates O(n*m)
    const m = log.get(i)
    servlog = servlog.filter(m2 => {
      const a = m!.sent.getTime() - 300 <= m2!.sent.getTime()
      const b = m2!.sent.getTime() <= m!.sent.getTime() + 300
      const c = m!.sender == m2!.sender
      const d = m!.type == m2!.type
      const e =
        (m!.type == MessageType.MESSAGE && m!.text == m2!.text) ||
        m2!.type != MessageType.MESSAGE
      return !(a && b && c && d && e)
    })
    i++
  }
  //these sort's might not even be neccessary, for log already sorted in theory and we can add order url arg to make sent time asc (though think it's already that by defult)
  //test data may not be sorted so if we make the assumption makesure to put test data in order to pass test
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

  var newLog = List<Message>()
  while (!(log.isEmpty() && servlog.isEmpty())) {
    if (log.isEmpty()) {
      newLog = newLog.push(servlog.first()!)
      servlog = servlog.slice(1)
    } else if (servlog.isEmpty()) {
      newLog = newLog.push(log.first()!)
      log = log.slice(1)
    } else if (log.first()!.sent <= servlog.first()!.sent) {
      newLog = newLog.push(log.first()!)
      log = log.slice(1)
    } else {
      newLog = newLog.push(servlog.first()!)
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
