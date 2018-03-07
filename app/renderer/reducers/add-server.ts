import { ElectricState } from '../store'
import { IAddServerAction } from '../actions'

import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
import * as IRC from 'irc'

export function createIRCClient(
  url: string,
  nickname: string,
  channels: string[]
) {
  return new IRC.Client(url, nickname, {
    channels: channels
  })
}

export default function addServer(
  state: ElectricState,
  action: IAddServerAction
): ElectricState {
  let newState = { ...state }

  newState.lastUsedConnectionId += 1
  let conn = new Connection(
    newState.lastUsedConnectionId,
    action.name,
    action.channels.map(chanName => {
      newState.lastUsedChannelId += 1
      return new Channel(newState.lastUsedChannelId, chanName)
    })
  )
  conn.setClient(createIRCClient(action.url, action.nickname, action.channels))

  newState.connections = newState.connections.push(conn)
  return newState
}
