import { ElectricState } from '../store'
import { IAddChannelAction } from '../actions'

import { replace } from '../utilities/replace'

export default function addChannel(
  state: ElectricState,
  action: IAddChannelAction
): ElectricState {
  const conn = state.connections.find(value => value.id === action.serverId)
  if (conn) {
    const chans = conn.channels.push(action.channel)
    const newConn = conn.set('channels', chans)
    const newState = state.set(
      'connections',
      replace(state.connections, conn, newConn)
    )
    return newState
  }
  return state
}
