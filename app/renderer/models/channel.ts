import { List, Record } from 'immutable'
import { Message, Guid } from './'

interface IChannel {
  id: Guid
  name: string
  log: List<Message>
  connected: boolean
}

const emptyGUID = Guid.createEmpty()

export const ChannelFactory = Record<IChannel>({
  id: emptyGUID,
  name: '',
  log: List<Message>([]),
  connected: false
})

export type Channel = Record<IChannel> & Readonly<IChannel>
