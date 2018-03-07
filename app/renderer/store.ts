import { List } from 'immutable'
import { Connection } from './models/connections'
import { Channel } from './models/channel'

export type ElectricState = {
  connections: List<Connection>
  currentConnection?: Connection
  currentChannel?: Channel
}
