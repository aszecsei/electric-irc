import { List } from 'immutable'
import { Connection } from './models/connections'
import { Channel } from './models/channel'

export type ElectricState = {
  connections: List<Connection>
  currentConnection?: Connection
  currentChannel?: Channel
  lastUsedConnectionId: number // Used for adding new connections
  lastUsedChannelId: number // Used for joining new channels
}
