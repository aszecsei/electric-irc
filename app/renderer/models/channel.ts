import { Message } from './message'

export class Channel {
  name: string
  log: Message[]

  constructor(name: string) {
    this.name = name
    // TODO: Read from file
    this.log = []
  }
}
