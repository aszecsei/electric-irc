import { ElectricState } from '../store'
import { IThemeWholesaleAction } from '../actions'
import { theme } from '../stylesheets/thememaps/themes'

export default function themeWholesale(
  state: ElectricState,
  action: IThemeWholesaleAction
): ElectricState {
  let newState = state
  const newTheme = theme.get(action.themename)

  if (newTheme) {
    newState = newState.set('themeName', action.themename)
    newState = newState.set('themeProperties', newTheme)
  }

  return newState
}
