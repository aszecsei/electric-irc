import { List } from 'immutable'
import { ElectricState } from '../store'
import { IAppendLogAction } from '../actions'

function replace<K>(list: List<K>, oldElement: K, newElement: K) {
  const oldIndex = list.indexOf(oldElement)
  if (oldIndex !== -1) {
    return list.set(oldIndex, newElement)
  } else {
    return list
  }
}

export default function appendLog(
  state: ElectricState,
  action: IAppendLogAction
): ElectricState {
  const conn = state.connections.find(value => {
    return value.id === action.serverId
  })
  if (conn) {
    const chan = conn.channels.find(value => {
      return value.id === action.channelId
    })
    if (chan) {
      const newChan = chan.set('log', chan.log.push(action.message))
      const newConn = conn.set(
        'channels',
        replace(conn.channels, chan, newChan)
      )
      return state.set('connections', replace(state.connections, conn, newConn))
    }
  }
  return state
}
