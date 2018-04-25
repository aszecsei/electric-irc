import { connect, Dispatch } from 'react-redux'
import { AddModal } from '../components/addmodal'
import { ElectricState } from '../store'
import { toggleAddServerModal, addServer } from '../actions'

export const mapStateToProps = (state: ElectricState) => {
  return {
    visible: state.addServerModalActive,
    connections: state.connections
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<ElectricState>) => {
  return {
    onAddServerToggle: () => {
      dispatch(toggleAddServerModal())
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

const AddModalContainer = connect(mapStateToProps, mapDispatchToProps)(AddModal)

export default AddModalContainer
