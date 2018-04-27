import { ElectricState } from '../store'
import { IThemeWholesaleAction } from '../actions'
import { theme } from '../stylesheets/thememaps/themes'
import { map } from '../stylesheets/thememaps/defaults'

export default function themeWholesale(
  state: ElectricState,
  action: IThemeWholesaleAction
): ElectricState {
  let newState = state
  const themename = action.themename
  let newTheme
    newTheme = themename !== 'light' && themename !== 'dark' ? state.themes.get(themename) : map.get(themename)
  if (newTheme) {
    newState = newState.set('themeName', action.themename)
    newState = newState.set('themeProperties', newTheme)
  }

  return newState
}
