import { List } from 'immutable'
import { Channel } from './channel'

import * as IRC from 'irc'

export const Clients = new Map<string, IRC.Client>()

export class Connection {
  readonly id: number
  readonly name: string
  readonly channels: List<Channel>

  constructor(id: number, name: string, channels: Channel[] = []) {
    this.name = name
    this.channels = List(channels)
    this.id = id
  }

  getClient() {
    return Clients.get(this.name)
  }

  setClient(client?: IRC.Client) {
    if (client) {
      if (!Clients.get(this.name)) {
        Clients.set(this.name, client)
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
}
