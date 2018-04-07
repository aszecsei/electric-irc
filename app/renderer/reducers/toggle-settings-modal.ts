import { ElectricState } from '../store'
import { IToggleSettingsModalAction } from '../actions'

export default function toggleSettingsModal(
  state: ElectricState,
  action: IToggleSettingsModalAction
): ElectricState {
  let newState = state

  if (action.visible === undefined) {
    newState = newState.set(
      'settingsModalActive',
      !newState.settingsModalActive
    )
  } else {
    newState = newState.set('settingsModalActive', action.visible)
  }

  return newState
}
