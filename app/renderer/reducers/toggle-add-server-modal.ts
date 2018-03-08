import { ElectricState } from '../store'
import { IToggleAddServerModalAction } from '../actions'

export default function toggleAddServerModal(
  state: ElectricState,
  action: IToggleAddServerModalAction
): ElectricState {
  let newState = { ...state }

  if (action.visible === undefined) {
    newState.addServerModalActive = !newState.addServerModalActive
  } else {
    newState.addServerModalActive = action.visible
  }

  return newState
}
