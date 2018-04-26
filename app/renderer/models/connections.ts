import { List, Record } from 'immutable'

import { Guid, Channel } from '.'

interface IConnection {
  id: Guid
  name: string
  url: string
  nickname: string
  channels: List<Channel>
}

const emptyGUID = Guid.createEmpty()

export const ConnectionFactory = Record<IConnection>({
  id: emptyGUID,
  name: '',
  url: '',
  nickname: '',
  channels: List<Channel>([])
})

export type Connection = Record<IConnection> & Readonly<IConnection>
