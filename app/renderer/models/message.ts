import { Record } from 'immutable'
import * as IRC from 'irc'

import { Guid } from '.'

export enum MessageType {
  MESSAGE,
  NICKCHANGE
}

interface IMessage {
  id: Guid
  type: MessageType
  text: string
  sender: string
}

const emptyGUID = Guid.createEmpty()

export const MessageFactory = Record<IMessage>({
  id: emptyGUID,
  type: MessageType.MESSAGE,
  text: '',
  sender: ''
})

export function parseMessage(
  nick: string,
  to: string,
  text: string,
  message?: IRC.IMessage
) {
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.MESSAGE,
    text: text,
    sender: nick
  })
}

export function parseNickChange(
  oldnick: string,
  newnick: string,
  channels: string[],
  message: IRC.IMessage
) {
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.NICKCHANGE,
    text: `${oldnick} is now known as ${newnick}.`
  })
}

export type Message = Record<IMessage> & Readonly<IMessage>
