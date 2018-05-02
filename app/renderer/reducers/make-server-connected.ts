import { ElectricState } from '../store'
import { IMakeServerConnectedAction } from '../actions'

import { replace } from '../utilities/replace'

export default function addChannel(
  state: ElectricState,
  action: IMakeServerConnectedAction
): ElectricState {
  const conn = state.connections.find(value => value.id === action.serverId)
  if (conn) {
    const newConn = conn.set('connected', true)
    const newState = state.set(
      'connections',
      replace(state.connections, conn, newConn)
    )
    return newState
  }
  return state
}
