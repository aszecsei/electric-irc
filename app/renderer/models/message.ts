import { Record } from 'immutable'
import * as IRC from 'irc'

import { Guid } from './guid'

export enum MessageType {
  MESSAGE,
  NICKCHANGE,
  SERVER,
  NOTICE,
  JOIN,
  QUIT,
  PART,
  KICK,
  KILL
}

interface IMessage {
  id: Guid
  type: MessageType
  text: string
  sender: string
  sent: Date
  isMe:boolean
}
const emptyGUID = Guid.createEmpty()

export const MessageFactory = Record<IMessage>({
  id: emptyGUID,
  type: MessageType.MESSAGE,
  text: '',
  sender: '',
  sent: new Date(),
  isMe:false
})
export function parseKillMessage(
  nick: string,
  reason?: string,
  sent: Date = new Date(),
  isMe=false
) {
  const str =
    reason && reason !== ''
      ? `${nick} has been KILLED (${reason})`
      : `${nick} has been KILLED`
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.KILL,
    text: str,
    sent,
    isMe
  })
}

export function parseKickMessage(
  nick: string,
  by: string,
  channel: string,
  reason?: string,
  sent: Date = new Date(),
  isMe=false
) {
  const str =
    reason && reason !== ''
      ? `${by} has KICKED ${nick} from ${channel} for "${reason}"`
      : `${by} has KICKED ${nick} from ${channel}`
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.KICK,
    text: str,
    sent,
    isMe
  })
}
export function parsePartMessage(
  nick: string,
  channel: string,
  reason?: string,
  sent: Date = new Date(),
  isMe=false
) {
  const str =
    reason && reason !== ''
      ? `${nick} has PARTED from ${channel} (${reason})`
      : `${nick} has PARTED from ${channel}`
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.PART,
    text: str,
    sent,
    isMe
  })
}
export function parseQuitMessage(
  nick: string,
  reason?: string,
  sent: Date = new Date(),
  isMe=false
) {
  const str =
    reason && reason !== ''
      ? `${nick} has QUIT (${reason})`
      : `${nick} has QUIT`
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.QUIT,
    text: str,
    sent,
    isMe
  })
}
export function parseJoinMessage(
  nick: string,
  channel: string,
  sent: Date = new Date(),
  isMe=false
) {
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.JOIN,
    text: `${nick} has JOINED ${channel}`,
    sent,
    isMe
  })
}

export function parseNoticeMessage(
  from: string,
  to: string,
  message: IRC.IMessage,
  isMe=false
) {
  const sender = `(${from}) NOTICE to ${to}`
  const str = message.args[1]
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.NOTICE,
    text: str,
    sender,
    isMe
  })
}
export function parseNumericMessage(server: string, message: IRC.IMessage,isMe=false) {
  let str = `${message.command}(${message.rawCommand})`
  if (message.args.length >= 1) {
    // has args beyond us
    str = str + ': [' // turn list into string
    let i = 0
    while (i < message.args.length) {
      str = `${str}${message.args[i]}, `
      i += 1
    }
    str = str.substring(0, str.length - 2) + ']'
  }
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.SERVER,
    text: str,
    sender: server,
    isMe
  })
}
export function parseMessage(
  nick: string,
  to: string,
  text: string,
  sent: Date = new Date(),
  isMe=false
) {
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.MESSAGE,
    text,
    sender: nick,
    sent,
    isMe
  })
}
export function parseNickChange(
  oldnick: string,
  newnick: string,
  channels: string[],
  sent: Date = new Date(),
  isMe=false
) {
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.NICKCHANGE,
    text: `${oldnick} is now known as ${newnick}.`,
    sent,
    isMe
  })
}

export type Message = Record<IMessage> & Readonly<IMessage>
