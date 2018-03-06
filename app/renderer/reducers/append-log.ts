import { ElectricState } from '../store'
import { IAppendLogAction } from '../actions'

export default function appendLog(
  state: ElectricState,
  action: IAppendLogAction
): ElectricState {
  let newState = { ...state }
  newState.connections = [...newState.connections]

  // TODO: Implement this

  return newState
}
