import { ElectricState } from '../store'
import { IAddChannelAction } from '../actions'

export default function addChannel(
  state: ElectricState,
  action: IAddChannelAction
): ElectricState {
  const index = state.connections.findIndex(value => {
    return value.id === action.serverId
  })
  const conn = state.connections.get(index)
  if (conn) {
    const chans = conn.channels.push(action.channel)
    const newConn = conn.set('channels', chans)
    return state.set('connections', state.connections.set(index, newConn))
  }
  return state
}
