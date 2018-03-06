import { Client } from './client'
import { Channel } from './channel'

export class Connection {
  client?: Client
  channels: Channel[]

  constructor() {
    this.channels = []
  }
}
