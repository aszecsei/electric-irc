import { ElectricState } from '../store'
import { IViewChannelAction } from '../actions'

export default function sendMessage(
  state: ElectricState,
  action: IViewChannelAction
): ElectricState {
  let newState = { ...state }

  const conn = state.connections.find(connection => {
    return connection.id == action.serverId
  })
  newState.currentConnection = conn

  if (conn) {
    const chan = conn.channels.find(channel => {
      return channel.id == action.channelId
    })
    newState.currentChannel = chan
  }

  return newState
}
