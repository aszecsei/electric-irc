import { ElectricState } from '../store'
import { IEditServerAction } from '../actions'

export default function editServer(
  state: ElectricState,
  action: IEditServerAction
): ElectricState {
  let newState = { ...state }
  newState.connections = [...newState.connections]

  // TODO: Implement this

  return newState
}
