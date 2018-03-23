import { ElectricState } from '../store'
import { IAddConnectionAction } from '../actions'

export default function addConnection(
  state: ElectricState,
  action: IAddConnectionAction
): ElectricState {
  return state.set('connections', state.connections.push(action.connection))
}
