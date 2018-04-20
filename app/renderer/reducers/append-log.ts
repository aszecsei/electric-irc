import { ElectricState } from '../store'
import { IAppendLogAction } from '../actions'
import { replace } from '../utilities/replace'

export default function appendLog(
  state: ElectricState,
  action: IAppendLogAction
): ElectricState {
  const conn = state.connections.find(value => {
    return value.id === action.serverId
  })
  if (conn) {
    const chan = conn.channels.find(value => {
      return value.id === action.channelId
    })
    if (chan) {
      const newChan = chan.set('log', chan.log.push(action.message))
      const newConn = conn.set(
        'channels',
        replace(conn.channels, chan, newChan)
      )
      return state.set('connections', replace(state.connections, conn, newConn))
    }
  }
  return state
}
