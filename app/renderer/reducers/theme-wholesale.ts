import { ElectricState } from '../store'
import { IThemeWholesaleAction } from '../actions'
import { theme } from '../stylesheets/thememaps/themes'
import { map } from '../stylesheets/thememaps/defaults'

export default function themeWholesale(
  state: ElectricState,
  action: IThemeWholesaleAction
): ElectricState {
  let newState = state
  let themename = action.themename
  let newTheme
  if (themename !== 'light' && themename !== 'dark') {
    newTheme = theme.get(action.themename)
  } else {
    newTheme = map.get(themename)
  }
  if (newTheme) {
    newState = newState.set('themeName', action.themename)
    newState = newState.set('themeProperties', newTheme)
  }

  return newState
}
