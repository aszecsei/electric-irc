import { ElectricState } from '../store'
import { IEditSettingsAction } from '../actions'
import { ISettings } from '../models/settings'

export default function editSettings<K extends keyof ISettings>(
  state: ElectricState,
  action: IEditSettingsAction<K>
): ElectricState {
  let newState = state

  let before = newState.settings
  console.log(before)
  before.set(action.prop, action.value)
  newState = newState.set('settings', before)

  return newState
}
