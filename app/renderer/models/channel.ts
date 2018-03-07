import { List } from 'immutable'
import { Message } from './message'

export class Channel {
  readonly id: number
  readonly name: string
  readonly log: List<Message>

  constructor(id: number, name: string) {
    this.name = name
    // TODO: Read from file
    this.log = List([])
    this.id = id
  }
}
