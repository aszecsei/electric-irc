import { connect, Dispatch } from 'react-redux'
import { ElectricState } from '../store'
import { toggleSettingsModal, addServer } from '../actions'
import SettingsModal from '../components/settingsmodal'

const mapStateToProps = (state: ElectricState) => {
  return {
    visible: state.settingsModalActive
  }
}
const mapDispatchToProps = (dispatch: Dispatch<ElectricState>) => {
  return {
    onSettingsToggle: () => {
      dispatch(toggleSettingsModal())
    },
    onAddServerSubmit: (
      serverName: string,
      serverURL: string,
      nickname: string,
      channels: string[]
    ) => {
      dispatch(addServer(serverName, serverURL, nickname, channels))
    }
  }
}

const AddModalContainer = connect(mapStateToProps, mapDispatchToProps)(
  SettingsModal
)

export default AddModalContainer
