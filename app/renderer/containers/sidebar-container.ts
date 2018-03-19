import { connect, Dispatch } from 'react-redux'
import { Sidebar } from '../components/sidebar'
import { ElectricState } from '../store'
import { viewChannel, toggleAddServerModal } from '../actions'
import { Connection } from '../models/connections'
import { Channel } from '../models/channel'

const mapStateToProps = (state: ElectricState) => {
  return {
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
    }
  }
}

const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)

export default SidebarContainer
