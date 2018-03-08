import { connect, Dispatch } from 'react-redux'
import { AddModal } from '../components/addmodal'
import { ElectricState } from '../store'
import { toggleAddServerModal } from '../actions'

const mapStateToProps = (state: ElectricState) => {
  return {
    visible: state.addServerModalActive
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ElectricState>) => {
  return {
    onAddServerToggle: () => {
      dispatch(toggleAddServerModal())
    }
  }
}

const AddModalContainer = connect(mapStateToProps, mapDispatchToProps)(AddModal)

export default AddModalContainer
