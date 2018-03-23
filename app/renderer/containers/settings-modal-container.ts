import { connect, Dispatch } from 'react-redux'
import { ElectricState } from '../store'
import { toggleSettingsModal, toggleSettingsTab } from '../actions'
import SettingsModal from '../components/settingsmodal'

const mapStateToProps = (state: ElectricState) => {
  return {
    visible: state.settingsModalActive,
    toggleTab: state.toggleTab
  }
}
const mapDispatchToProps = (dispatch: Dispatch<ElectricState>) => {
  return {
    onSettingsToggle: () => {
      dispatch(toggleSettingsModal())
    },
    onTabToggle: (arg: string) => {
      dispatch(toggleSettingsTab(arg))
    }
  }
}

const SettingsModalContainer = connect(mapStateToProps, mapDispatchToProps)(
  SettingsModal
)

export default SettingsModalContainer
