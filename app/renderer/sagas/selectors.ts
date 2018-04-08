import { ElectricState } from '../store'
import { Guid } from '../models'

export const getConnection = (state: ElectricState, serverId: Guid) =>
  state.connections.find(connection => connection.id == serverId)
export const getChannel = (
  state: ElectricState,
  serverId: Guid,
  channelId: Guid
) => {
  const conn = state.connections.find(connection => connection.id == serverId)
  if (conn) {
    return conn.channels.find(channel => channel.id == channelId)
  }
  return undefined
}
export const getChannelByName = (
  state: ElectricState,
  serverId: Guid,
  channelName: string
) => {
  const conn = state.connections.find(connection => connection.id == serverId)
  if (conn) {
    return conn.channels.find(channel => channel.name == channelName)
  }
  return undefined
}
