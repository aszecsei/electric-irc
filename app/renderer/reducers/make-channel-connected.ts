import { ElectricState } from '../store'
import { IMakeChannelConnectedAction } from '../actions'

import { replace } from '../utilities/replace'

export default function addChannel(
  state: ElectricState,
  action: IMakeChannelConnectedAction
): ElectricState {
  const conn = state.connections.find(value => value.id === action.serverId)
  if (conn) {
    const chann = conn.channels.find(value => value.id === action.channelId)
    if (chann) {
      const newChann = chann.set('connected', true)
      const newConn = conn.set('channels', replace(conn.channels, chann, newChann))
      const newState = state.set(
        'connections',
        replace(state.connections, conn, newConn)
      )
      return newState
    }
    return state
  }
  return state
}
