import { List } from 'immutable'
import { Connection } from './models/connections'

export type ElectricState = {
  connections: List<Connection>
}
