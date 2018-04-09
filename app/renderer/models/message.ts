import { Record } from 'immutable'
import * as IRC from 'irc'

import { Guid } from '.'

export enum MessageType {
  MESSAGE,
  NICKCHANGE,
  SERVER,
  NOTICE
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
export function parseNoticeMessage(
  from: string,
  to: string,
  message: IRC.IMessage
) {
  const sender = '(' + from + ') NOTICE to ' + to
  const str = message.args[1]
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.NOTICE,
    text: str,
    sender: sender
  })
}
export function parseNumericMessage(server: string, message: IRC.IMessage) {
  var str = message.command + '(' + message.rawCommand + ')'
  if (message.args.length >= 1) {
    //has args beyond us
    str = str + ': [' //turn list into string
    var i = 0
    while (i < message.args.length) {
      str = str + message.args[i] + ', '
      i += 1
    }
    str = str.substring(0, str.length - 2) + ']'
  }
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.SERVER,
    text: str,
    sender: server
  })
}
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
