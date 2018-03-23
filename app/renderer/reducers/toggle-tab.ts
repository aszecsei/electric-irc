import { ElectricState } from '../store'
import { IToggleTabAction } from '../actions'

export default function toggleTab(
  state: ElectricState,
  action: IToggleTabAction
): ElectricState {
  let newState = state

  if (action.tab != '1' && action.tab != '2' && action.tab != '3') {
    newState = newState.set('toggleTab', action.tab)
  }
  return newState
}
