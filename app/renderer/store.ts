import { List, Record, Map } from 'immutable'
import { Connection } from './models/connections'
import { Channel } from './models/channel'

import { theme, backup } from './stylesheets/thememaps/themes'
import { SettingsFactory, Settings } from './models/settings'
import { Guid } from './models'
import { map } from './stylesheets/thememaps/defaults'

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
  themes: Map<string, Map<string, string>>
  addChannelConnId?: Guid // if add channel modal should be not visable this need to be undefined
}

export const ElectricStateFactory = Record<IElectricState>({
  connections: List<Connection>([]),
  currentConnectionId: undefined,
  currentChannelId: undefined,
  themeName: 'dark',
  addServerModalActive: false,
  themeProperties: map.get('dark') || backup,
  settingsModalActive: false,
  settings: SettingsFactory(),
  toggleTab: '1',
  themes: theme,
  addChannelConnId: undefined
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

export function getSettings(state: ElectricState) {
  return {
    settings: state.settings,
    theme: state.themeName
  }
}
