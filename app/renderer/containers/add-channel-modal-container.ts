import { connect, Dispatch } from 'react-redux'
import { AddChannelModal } from '../components/addchannelmodal'
import { ElectricState } from '../store'
import { toggleAddChannelModal, addChannel } from '../actions'
import { Guid, ChannelFactory } from '../models'

const mapStateToProps = (state: ElectricState) => {
  return {
    visible: state.addChannelModalActive
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ElectricState>) => {
  return {
    onAddChannelToggle: () => {
      dispatch(toggleAddChannelModal())
    },
    onAddChannelSubmit: (
      Server: Guid,
      channelName: string,
      channel = new ChannelFactory({
        id: Guid.create(),
        name: channelName
      })
    ) => {
      dispatch(addChannel(Server, channel))
    }
  }
}

const AddChannelModalContainer = connect(mapStateToProps, mapDispatchToProps)(
  AddChannelModal
)

export default AddChannelModalContainer
