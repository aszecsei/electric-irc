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
    before =action.prop? before.set(action.prop as PropTypes, action.value):action.value
    newState = newState.set('settings', before)
    return newState
}
