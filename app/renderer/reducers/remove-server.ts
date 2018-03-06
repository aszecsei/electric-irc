import { ElectricState } from '../store'
import { IRemoveServerAction } from '../actions'

export default function removeServer(
  state: ElectricState,
  action: IRemoveServerAction
): ElectricState {
  let newState = { ...state }
  newState.connections = [...newState.connections]

  // TODO: Implement this

  return newState
}
