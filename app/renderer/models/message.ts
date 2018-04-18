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
}
const emptyGUID = Guid.createEmpty()

export const MessageFactory = Record<IMessage>({
  id: emptyGUID,
  type: MessageType.MESSAGE,
  text: '',
  sender: '',
  sent: new Date()
})
export function parseKillMessage(
  nick: string,
  reason?: string,
  sent: Date = new Date()
) {
  var str = nick + ' has been KILLED'
  if (reason && reason != '') {
    str = str + ' (' + reason + ')'
  }
  str = str + '!'
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.KILL,
    text: str,
    sent: sent
  })
}
export function parseKickMessage(
  nick: string,
  by: string,
  channel: string,
  reason?: string,
  sent: Date = new Date()
) {
  var str = by + ' has KICKED ' + nick + ' from ' + channel
  if (reason && reason != '') {
    str = str + ' for "' + reason + '"'
  }
  str = str + '!'
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.KICK,
    text: str,
    sent: sent
  })
}
export function parsePartMessage(
  nick: string,
  channel: string,
  reason?: string,
  sent: Date = new Date()
) {
  var str = nick + ' has PARTED from ' + channel
  if (reason && reason != '') {
    str = str + ' (' + reason + ')'
  }
  str = str + '!'
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.PART,
    text: str,
    sent: sent
  })
}
//export function parserMessageFromServer(command:string,)
export function parseQuitMessage(
  nick: string,
  reason?: string,
  sent: Date = new Date()
) {
  var str = nick + ' has QUIT'
  if (reason && reason != '') {
    str = str + ' (' + reason + ')'
  }
  str = str + '!'
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.QUIT,
    text: str,
    sent: sent
  })
}
export function parseJoinMessage(
  nick: string,
  channel: string,
  sent: Date = new Date()
) {
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.JOIN,
    text: nick + ' has JOINED ' + channel + '.',
    sent: sent
  })
}

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
  message?: IRC.IMessage,
  sent: Date = new Date()
) {
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.MESSAGE,
    text: text,
    sender: nick,
    sent: sent
  })
}
export function parseNickChange(
  oldnick: string,
  newnick: string,
  channels: string[],
  message?: IRC.IMessage
) {
  return new MessageFactory({
    id: Guid.create(),
    type: MessageType.NICKCHANGE,
    text: `${oldnick} is now known as ${newnick}.`
  })
}

export type Message = Record<IMessage> & Readonly<IMessage>
