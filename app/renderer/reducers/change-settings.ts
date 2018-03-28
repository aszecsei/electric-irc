import { ElectricState } from '../store'
import { IEditSettingsAction } from '../actions'
import { ISettings } from '../models/settings'

export default function editSettings(
  state: ElectricState,
  action: IEditSettingsAction
): ElectricState {
  let newState = state

  let before = newState.settings
  console.log(before)

  type PropTypes = keyof ISettings

  before.set(action.prop as PropTypes, action.value)
  newState = newState.set('settings', before)

  return newState
}
