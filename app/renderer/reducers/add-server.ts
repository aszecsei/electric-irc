import { ElectricState } from '../store'
import { IAddServerAction } from '../actions'

import { Client } from '../models/client'
import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
import * as irc from 'irc'

export default function addServer(
  state: ElectricState,
  action: IAddServerAction
): ElectricState {
  let newState = { ...state }
  newState.connections = [...newState.connections]

  let conn = new Connection()
  conn.channels = action.channels.map(chanName => {
    return new Channel(chanName)
  })
  conn.client = new Client(
    action.name,
    new irc.Client(action.url, action.nickname, {
      channels: action.channels
    })
  )

  // TODO: Send an action for these callbacks

  // conn.client.client.addListener('raw', (msg: irc.IMessage) => {
  //   Message.Log.push(new Message(JSON.stringify(msg)))
  // })
  // conn.client.client.addListener('error', (msg: irc.IMessage) => {
  //   Message.Log.push(new Message(JSON.stringify(msg)))
  // })

  newState.connections.push(conn)
  return newState
}
