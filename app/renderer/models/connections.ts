import { Client } from './client'
import * as irc from 'irc'

export class Connection {
  client?: Client
  channels: string[]

  constructor() {
    this.channels = []
  }
}

export class Message {
  // TODO: Move this so it's per-server and per-channel
  static Log: Message[] = []

  // TODO: Flesh this out
  msgText: string

  constructor(msgText: string) {
    this.msgText = msgText
  }
}

export class ConnectionHandler {
  static connections: Connection[] = []

  static addServer(
    name: string,
    url: string,
    nickname: string,
    channels: string[]
  ) {
    let conn = new Connection()
    conn.channels = channels
    conn.client = new Client(
      name,
      new irc.Client(url, nickname, {
        channels: channels
      })
    )
    ConnectionHandler.connections.push(conn)
    conn.client.client.addListener('raw', (msg: irc.IMessage) => {
      Message.Log.push(new Message(JSON.stringify(msg)))
    })
    conn.client.client.addListener('error', (msg: irc.IMessage) => {
      Message.Log.push(new Message(JSON.stringify(msg)))
    })
  }

  // TODO: Auto-add saved connections
  // TODO: Create server given channel list
}

// TODO: Remove this so we can add servers manually
// ConnectionHandler.addServer('Freenode', 'irc.freenode.net', 'eIRCClient', [
//   '#electric-irc'
// ])
