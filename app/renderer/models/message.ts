import { Record } from 'immutable'

interface IMessage {
  text: string
  sender?: string
}

export const MessageFactory = Record<IMessage>({
  text: '',
  sender: undefined
})

export type Message = Record<IMessage> & Readonly<IMessage>
