import { List } from 'immutable'
import { ElectricState } from '../store'
import { IAddServerAction, IAddConnectionAction } from '../actions'

import { ConnectionFactory, setClient } from '../models/connections'
import { Channel, ChannelFactory } from '../models/channel'
import * as IRC from 'irc'

export default function addConnection(
  state: ElectricState,
  action: IAddConnectionAction
): ElectricState {
  return state.set('connections', state.connections.push(action.connection))
}
