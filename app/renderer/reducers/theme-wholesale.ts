import { ElectricState } from '../store'
import { IThemeWholesaleAction } from '../actions'
import { theme } from '../stylesheets/thememaps/themes'

export default function themeWholesale(
  state: ElectricState,
  action: IThemeWholesaleAction
): ElectricState {
  let newState = state
  newState = newState.set('themeName', action.themename)
  newState = newState.set('themeProperties', theme.get(action.themename)!)

  return newState
}
