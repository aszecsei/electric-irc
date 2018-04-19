import { ElectricState } from '../store'
import { IAddThemeAction } from '../actions'

export default function addTheme(
  state: ElectricState,
  action: IAddThemeAction
): ElectricState {
  return state.set('themes', state.themes.set(action.name, action.theme))
}
