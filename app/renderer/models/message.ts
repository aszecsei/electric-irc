import { Record } from 'immutable'

interface IMessage {
  text: string
  prefix: string
  command: string
  rawCommand: string
  commandType: string
  args: Array<string>
  sender?: string
}

export const MessageFactory = Record<IMessage>({
  text: '',
  prefix: '',
  command: '',
  rawCommand: '',
  commandType: '',
  args: [],
  sender: undefined
})

export type Message = Record<IMessage> & Readonly<IMessage>
