import { List, Record } from 'immutable'
import { Message } from './message'

interface IChannel {
  id: number
  name: string
  log: List<Message>
}

export const ChannelFactory = Record<IChannel>({
  id: -1,
  name: '',
  log: List<Message>([])
})

export type Channel = Record<IChannel> & Readonly<IChannel>
