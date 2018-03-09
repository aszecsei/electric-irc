import {
  ElectricState,
  getCurrentConnection,
  getCurrentChannel
} from '../store'
import { ISendMessageAction } from '../actions'
import { getClient } from '../models/connections'
import { List } from 'immutable'

export function _replace<T>(
  list: List<T>,
  originalItem: T,
  newItem: T
): List<T> {
  return list.map(item => {
    if (item === originalItem) {
      return newItem
    } else {
      return item
    }
  })
}

export default function sendMessage(
  state: ElectricState,
  action: ISendMessageAction
): ElectricState {
  let newState = state

  const conn = state.connections.find(connection => {
    return connection.id == action.serverId
  })
  if (conn) {
    const chan = conn.channels.find(channel => {
      return channel.id == action.channelId
    })
    if (chan) {
      let c = getClient(conn)
      if (c) {
        c.say(chan.name, action.message.text)
      }

      let newChan = chan.set('log', chan.log.push(action.message))
      let newConn = conn.set('channels', _replace(conn.channels, chan, newChan))
      newState = newState.set(
        'connections',
        _replace(newState.connections, conn, newConn)
      )
    }
  }

  return newState
}
