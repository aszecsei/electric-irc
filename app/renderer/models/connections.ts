import { List } from 'immutable'
import { Channel } from './channel'

import * as IRC from 'irc'

export const Clients = new Map<string, IRC.Client>()

import { Record } from 'immutable'

interface IConnection {
  id: number
  name: string
  url: string
  nickname: string
  channels: List<Channel>
}

export const ConnectionFactory = Record<IConnection>({
  id: -1,
  name: '',
  url: '',
  nickname: '',
  channels: List<Channel>([])
})

export type Connection = Record<IConnection> & Readonly<IConnection>

export function getClient(connection: Connection) {
  return Clients.get(connection.url)
}

export function setClient(connection: Connection, client?: IRC.Client) {
  if (client) {
    if (!Clients.get(connection.url)) {
      Clients.set(connection.url, client)

      // TODO: Dispatch an action for these callbacks

      // conn.client.client.addListener('raw', (msg: irc.IMessage) => {
      //   Message.Log.push(new Message(JSON.stringify(msg)))
      // })
      // conn.client.client.addListener('error', (msg: irc.IMessage) => {
      //   Message.Log.push(new Message(JSON.stringify(msg)))
      // })
    }
  }
}
