import { ElectricState } from '../store'
import { IAddServerAction } from '../actions'

import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
import * as IRC from 'irc'

export default function addServer(
  state: ElectricState,
  action: IAddServerAction
): ElectricState {
  let newState = { ...state }
  newState.connections = [...newState.connections]

  let conn = new Connection(
    action.name,
    action.channels.map(chanName => {
      return new Channel(chanName)
    })
  )
  conn.setClient(
    new IRC.Client(action.url, action.nickname, {
      channels: action.channels
    })
  )

  newState.connections.push(conn)
  return newState
}
