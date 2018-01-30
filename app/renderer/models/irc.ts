import * as irc from 'irc'
import { getOptions } from './options'
import { IMessage } from 'irc'

export class Server {
  client: irc.Client

  constructor(server: string, nick: string) {
    let opts = getOptions()
    this.client = new irc.Client(server, nick, opts)

    // TODO: Add event listeners
    // see https://node-irc.readthedocs.io/en/latest/API.html#events

    this.client.addListener(
      'ctcp-version',
      (from: string, to: string, message: IMessage) => {
        // TODO: check if we should respond?
        this.sendNotice(
          from,
          `VERSION ElectricIRC ${process.env.npm_package_version}`
        )
      }
    )

    this.client.addListener(
      'ctcp-privmsg',
      (from: string, to: string, text: string, message: IMessage) => {
        // TODO: Implement CTCP TIME command
        // TODO: Implement CTCP PING command
      }
    )

    // TODO: Implement DCC chat
  }

  joinChannel(channel: string, callback: irc.handlers.IJoinChannel) {
    this.client.join(channel, callback)
  }

  leaveChannel(
    channel: string,
    callback: irc.handlers.IPartChannel,
    message?: string
  ) {
    if (message) {
      this.client.part(channel, message, callback)
    } else {
      this.client.part(channel, '', callback)
    }
  }

  say(target: string, message: string) {
    this.client.say(target, message)
  }

  sendPrivateMessage(target: string, message: string) {
    this.client.ctcp(target, 'privmsg', message)
  }

  sendNotice(target: string, message: string) {
    this.client.notice(target, message)
  }

  sendAction(target: string, message: string) {
    this.client.action(target, message)
  }

  whois(nick: string, callback: irc.handlers.IWhois) {
    this.client.whois(nick, callback)
  }

  // TODO: Channel listing

  connect(retryCount?: number, callback?: irc.handlers.IRaw) {
    this.client.connect(retryCount, callback)
  }

  disconnect(message: string, callback: () => void) {
    this.client.disconnect(message, callback)
  }

  activateFloodProtection(interval: number) {
    this.client.activateFloodProtection(interval)
  }
}
