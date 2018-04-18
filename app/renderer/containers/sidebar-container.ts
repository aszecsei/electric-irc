import { connect, Dispatch } from 'react-redux'
import { Sidebar } from '../components/sidebar'
import { ElectricState } from '../store'
import {
  viewChannel,
  toggleAddServerModal,
  toggleAddChannelModal
} from '../actions'
import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
import { Guid } from '../models'

const mapStateToProps = (state: ElectricState) => {
  return {
    curChanID: state.currentChannelId,
    connections: state.connections
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ElectricState>) => {
  return {
    onChannelClick: (conn: Connection, channel: Channel) => {
      dispatch(viewChannel(conn.id, channel.id))
    },
    onAddServerClick: () => {
      dispatch(toggleAddServerModal(true))
    },
    onAddChannelClick: (connid?: Guid) => {
      dispatch(toggleAddChannelModal(connid))
    }
  }
}

const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)

export default SidebarContainer
