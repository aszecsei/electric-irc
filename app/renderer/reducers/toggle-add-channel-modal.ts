import { ElectricState } from '../store'
import { IToggleAddChannelModalAction } from '../actions'

export default function toggleAddServerModal(
  state: ElectricState,
  action: IToggleAddChannelModalAction
): ElectricState {
  let newState = state

  if (action.visible === undefined) {
    newState = newState.set(
      'addChannelModalActive',
      !newState.addChannelModalActive
    )
  } else {
    newState = newState.set('addChannelModalActive', action.visible)
  }
  return newState
}
