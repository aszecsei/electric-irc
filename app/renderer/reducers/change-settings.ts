import { ElectricState } from '../store'
import { IEditSettingsAction } from '../actions'

export default function editSettings(
  state: ElectricState,
  action: IEditSettingsAction
): ElectricState {
  let newState = state

  let before = newState.settings
  console.log(before)
  before.set(action.prop, action.value)
  newState = newState.set('settings', before)

  return newState
}
