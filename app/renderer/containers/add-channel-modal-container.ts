import { connect, Dispatch } from 'react-redux'
import { AddChannelModal } from '../components/addchannelmodal'
import { ElectricState } from '../store'
import { toggleAddChannelModal, joinChannel } from '../actions'
import { Guid, ChannelFactory } from '../models'

const mapStateToProps = (state: ElectricState) => {
  return {
    connID: state.addChannelConnId,
    connections: state.connections
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ElectricState>) => {
  return {
    onAddChannelToggle: () => {
      dispatch(toggleAddChannelModal())
    },
    onAddChannelSubmit: (connid: Guid, channel: string) => {
      dispatch(joinChannel(connid, channel))
    }
  }
}

const AddChannelModalContainer = connect(mapStateToProps, mapDispatchToProps)(
  AddChannelModal
)

export default AddChannelModalContainer