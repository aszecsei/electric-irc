import { ElectricState } from '../store'
import { IPlayWithThemeAction } from '../actions'
import { darken, lighten } from '../stylesheets/utils/colors'
import * as polished from 'polished'

export default function playWithTheme(
  state: ElectricState,
  action: IPlayWithThemeAction
): ElectricState {
  let properties = state.themeProperties
  switch (action.property) {
    case 'background':
      properties = state.themeProperties.set('--bg', action.value)
      break
    case 'primary':
      properties = state.themeProperties
        .set('--primary', action.value)
        .set('--primary-light', polished.lighten(lighten, action.value))
        .set('--primary-dark', polished.darken(darken, action.value))
      break
    case 'secondary':
      properties = state.themeProperties
        .set('--secondary', action.value)
        .set('--secondary-light', polished.lighten(lighten, action.value))
        .set('--secondary-dark', polished.darken(darken, action.value))
      break
    case 'text':
      properties = state.themeProperties
        .set('--primary-text', action.value)
        .set('--secondary-text', polished.rgba(action.value, 0.7))
        .set('--disabled-text', polished.rgba(action.value, 0.5))
        .set('--dividers', polished.rgba(action.value, 0.12))
  }
  return state.set('themeProperties', properties)
}
