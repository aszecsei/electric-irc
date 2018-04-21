import { ElectricState } from '../store'
import { IAddThemeAction } from '../actions'

export default function addTheme(
  state: ElectricState,
  action: IAddThemeAction
): ElectricState {
  let Newstate = state.set('themeName', action.name)
  Newstate = Newstate.set('themes', state.themes.set(action.name, action.theme))
  return Newstate
}
