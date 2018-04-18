import { List, Record, Map } from 'immutable'
import { Connection } from './models/connections'
import { Channel } from './models/channel'

import { theme, backup } from './stylesheets/thememaps/themes'
import { SettingsFactory, Settings } from './models/settings'
import { Guid } from './models'

interface IElectricState {
  connections: List<Connection>
  currentConnectionId?: Guid
  currentChannelId?: Guid
  settingsModalActive: boolean
  addServerModalActive: boolean
  themeName: string
  themeProperties: Map<string, string>
  settings: Settings
  toggleTab: string
}

export const ElectricStateFactory = Record<IElectricState>({
  connections: List<Connection>([]),
  currentConnectionId: undefined,
  currentChannelId: undefined,
  lastUsedConnectionId: 0,
  lastUsedChannelId: 0,
  themeName: 'light',
  addServerModalActive: false,
  themeProperties: theme.get('light') || backup,
  settingsModalActive: true,
  settings: SettingsFactory(),
  toggleTab: '1'
})

export type ElectricState = Record<IElectricState> & Readonly<IElectricState>

export function getCurrentConnection(
  state: ElectricState
): Connection | undefined {
  return state.connections.find(connection => {
    return connection.id === state.currentConnectionId
  })
}

export function getCurrentChannel(state: ElectricState): Channel | undefined {
  const conn = getCurrentConnection(state)
  if (conn) {
    return conn.channels.find(channel => {
      return channel.id === state.currentChannelId
    })
  }
  return undefined
}
