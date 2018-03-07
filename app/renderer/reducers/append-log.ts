import { ElectricState } from '../store'
import { IAppendLogAction } from '../actions'

export default function appendLog(
  state: ElectricState,
  action: IAppendLogAction
): ElectricState {
  let newState = { ...state }

  // TODO: Implement this

  return newState
}
