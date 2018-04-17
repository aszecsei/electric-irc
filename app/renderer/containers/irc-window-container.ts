import { connect, Dispatch } from 'react-redux'
import { ChatWindow } from '../components/ircwindow'
import { ElectricState } from '../store'
import { sendMessage } from '../actions'
import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
import { Message } from '../models/message'

const mapStateToProps = (state: ElectricState) => {
  let conn: Connection | undefined
  let chan: Channel | undefined
  conn = state.connections.find(connection => {
    return connection.id === state.currentConnectionId
  })
  if (conn) {
    chan = conn.channels.find(channel => {
      return channel.id === state.currentChannelId
    })
  }
  return {
    connection: conn,
    channel: chan,
    messages: chan ? chan.log : undefined
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ElectricState>) => {
  return {
    onSendMessage: (message: string, conn: Connection, channel: Channel) => {
      dispatch(sendMessage(conn.id, channel.id, message))
    }
  }
}

const ChatWindowContainer = connect(mapStateToProps, mapDispatchToProps)(
  ChatWindow
)

export default ChatWindowContainer
