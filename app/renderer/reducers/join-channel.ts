import { List } from 'immutable'
import { ElectricState } from '../store'
import { IJoinChannelAction } from '../actions'

function replace_at<K>(list: List<K>, ind: number, newElement: K) {
  if (ind !== -1) {
    return list.set(ind, newElement)
  } else {
    return list
  }
}
export default function joinChannel(
  state: ElectricState,
  action: IJoinChannelAction
): ElectricState {
  const index = state.connections.findKey(value => {
    return value.id === action.serverId
  })
  const conn = state.connections.find(value => {
    return value.id === action.serverId
  })
  if (conn) {
    const chann = conn.channels.find(value => {
      return value.name == action.channel.name
    })
    if (!chann) {
      var chans = conn.channels
      chans = chans.push(action.channel)
      const newConn = conn.set('channels', chans)
      const newState = state.set(
        'connections',
        replace_at(state.connections, index as number, newConn)
      )
      //console.log(state)
      //console.log(newState)
      return newState
    }
  }
  return state
}
