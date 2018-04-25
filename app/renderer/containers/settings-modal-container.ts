import { connect, Dispatch } from 'react-redux'
import { ElectricState } from '../store'
import {
  toggleSettingsModal,
  toggleSettingsTab,
  editSettings,
  themeWholesale,
  addTheme,
  playWithTheme
} from '../actions'
import SettingsModal from '../components/settingsmodal'
import { ISettings } from '../models/settings'
import { map } from '../stylesheets/thememaps/defaults'
import { Map } from 'immutable'

const mapStateToProps = (state: ElectricState) => {
  return {
    visible: state.settingsModalActive,
    toggleTab: state.toggleTab,
    settings: state.settings,
    currentTheme: state.themeName,
    themes: state.themes.merge(map),
    thistheme: state.themeProperties
  }
}
const mapDispatchToProps = (dispatch: Dispatch<ElectricState>) => {
  return {
    onSettingsToggle: () => {
      dispatch(toggleSettingsModal())
    },
    onTabToggle: (arg: string) => {
      dispatch(toggleSettingsTab(arg))
      console.log(arg)
    },
    changeSetting: (event: keyof ISettings, value: any) => {
      dispatch(editSettings(event, value))
    },
    changeTheme: (theme: string) => {
      dispatch(themeWholesale(theme))
    },
    addTheme: (name: string, theme: Map<string, string>) => {
      dispatch(addTheme(name, theme))
    },
    playWithTheme: (property: string, color: string) => {
      dispatch(playWithTheme(property, color))
    }
  }
}

const SettingsModalContainer = connect(mapStateToProps, mapDispatchToProps)(
  SettingsModal
)

export default SettingsModalContainer
