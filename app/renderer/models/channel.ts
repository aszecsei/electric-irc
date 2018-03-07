import { List } from 'immutable'
import { Message } from './message'

let lastId = 0

export class Channel {
  readonly id: number
  readonly name: string
  readonly log: List<Message>

  constructor(name: string) {
    this.name = name
    // TODO: Read from file
    this.log = List([])
    this.id = lastId
    lastId++
  }
}
