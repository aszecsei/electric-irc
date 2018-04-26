import { ElectricState } from '../store'
import { IEditSettingsAction } from '../actions'
import { ISettings } from '../models/settings'

type PropTypes = keyof ISettings

export default function editSettings(
  state: ElectricState,
  action: IEditSettingsAction
): ElectricState {
  let newState = state

  let before = newState.settings
  // console.log(before)

  before = before.set(action.prop as PropTypes, action.value)
  newState = newState.set('settings', before)

  return newState
}
