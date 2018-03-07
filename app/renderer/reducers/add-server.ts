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

  let conn = new Connection(
    action.name,
    action.channels.map(chanName => {
      return new Channel(chanName)
    })
  )
  conn.setClient(createIRCClient(action.url, action.nickname, action.channels))

  newState.connections = newState.connections.push(conn)
  return newState
}
