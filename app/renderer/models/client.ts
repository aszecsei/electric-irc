import * as irc from 'irc'

export class Client {
  name: string
  client: irc.Client

  constructor(name: string, client: irc.Client) {
    this.name = name
    this.client = client
  }
}
