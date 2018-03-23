import { ElectricState } from '../store'
import { IAddServerAction, IAddConnectionAction } from '../actions'

import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
import * as IRC from 'irc'

export default function addServer(
  state: ElectricState,
  action: IAddConnectionAction
): ElectricState {
  let newState = state
  newState.connections = newState.connections.push(action.connection)
  return newState
}
