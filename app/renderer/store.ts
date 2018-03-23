import { List, Record } from 'immutable'
import { Connection } from './models/connections'
import { Channel } from './models/channel'

interface IElectricState {
  connections: List<Connection>
  currentConnectionId?: number
  currentChannelId?: number
  lastUsedConnectionId: number
  lastUsedChannelId: number

  addServerModalActive: boolean
}

export const ElectricStateFactory = Record<IElectricState>({
  connections: List<Connection>([]),
  currentConnectionId: undefined,
  currentChannelId: undefined,
  lastUsedConnectionId: 0,
  lastUsedChannelId: 0,

  addServerModalActive: false
})

export type ElectricState = Record<IElectricState> & Readonly<IElectricState>

export function getCurrentConnection(
  state: ElectricState
): Connection | undefined {
  return state.connections.find(connection => {
    return connection.id == state.currentConnectionId
  })
}

export function getCurrentChannel(state: ElectricState): Channel | undefined {
  const conn = getCurrentConnection(state)
  if (conn) {
    return conn.channels.find(channel => {
      return channel.id == state.currentChannelId
    })
  }
  return undefined
}
