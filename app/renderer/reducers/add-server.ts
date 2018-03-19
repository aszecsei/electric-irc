import { List } from 'immutable'
import { ElectricState } from '../store'
import { IAddServerAction } from '../actions'

import { ConnectionFactory, setClient } from '../models/connections'
import { Channel, ChannelFactory } from '../models/channel'
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
  let newState = state.set(
    'lastUsedConnectionId',
    state.lastUsedConnectionId + 1
  )
  let conn = new ConnectionFactory({
    id: newState.lastUsedConnectionId,
    name: action.name,
    channels: List<Channel>(
      action.channels.map(chanName => {
        newState = newState.set(
          'lastUsedChannelId',
          newState.lastUsedChannelId + 1
        )
        return new ChannelFactory({
          id: newState.lastUsedChannelId,
          name: chanName
        })
      })
    )
  })
  setClient(conn, createIRCClient(action.url, action.nickname, action.channels))

  newState = newState.set('connections', newState.connections.push(conn))
  return newState
}
