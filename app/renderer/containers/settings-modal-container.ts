import { connect, Dispatch } from 'react-redux'
import { ElectricState } from '../store'
import {
  toggleSettingsModal,
  toggleSettingsTab,
  editSettings,
  themeWholesale
} from '../actions'
import SettingsModal from '../components/settingsmodal'
import { ISettings } from '../models/settings'

const mapStateToProps = (state: ElectricState) => {
  return {
    visible: state.settingsModalActive,
    toggleTab: state.toggleTab,
    settings: state.settings,
    currentTheme: state.themeName
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
    }
  }
}

const SettingsModalContainer = connect(mapStateToProps, mapDispatchToProps)(
  SettingsModal
)

export default SettingsModalContainer
