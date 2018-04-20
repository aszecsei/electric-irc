import { ElectricState } from '../store'
import { IViewChannelAction } from '../actions'

export default function sendMessage(
  state: ElectricState,
  action: IViewChannelAction
): ElectricState {
  let newState = state
  newState = newState.set('currentConnectionId', undefined)
  newState = newState.set('currentChannelId', undefined)

  const conn = state.connections.find(connection => {
    return connection.id === action.serverId
  })

  // If the specified connection exists
  if (conn) {
    newState = newState.set('currentConnectionId', action.serverId)

    const chan = conn.channels.find(channel => {
      return channel.id === action.channelId
    })

    // If the specified channel exists
    if (chan) {
      newState = newState.set('currentChannelId', action.channelId)
    }
  }
  // console.log(newState.currentChannelId)
  return newState
}
