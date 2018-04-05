import * as React from 'react'

import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
import { Message, MessageFactory } from '../models/message'

interface IChatBoxProps {
  connection?: Connection
  channel?: Channel
  onSendMessage: (message: Message, conn: Connection, channel: Channel) => void
}
interface IMessageEntryState {
  value: string
}
export class MessageEntry extends React.Component<
  IChatBoxProps,
  IMessageEntryState
> {
  constructor(props: IChatBoxProps) {
    super(props)
    this.state = { value: '' }
  }

  handleChange = (event: any) => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = (event: any) => {
    //TODO: do nothing instead of display message if client raises error(ie try to do '/privmsg #elec2 hi' when not joined #elect2)
    if (this.props.connection && this.props.channel) {
      //TODO: intercept /command strings
      //TODO: if '/PRIVMSG user message' then open new prvt message channel, ascociate pvt messages there
      var text: string
      var command: string
      var args: string[]
      var channel: Channel | undefined
      const recommand = /^\/[a-z]+/i
      const reres = recommand.exec(this.state.value)
      if (reres) {
        if (/^\/PRIVMSG$/i.test(reres[0])) {
          const i = this.state.value.indexOf(' ')
          const ii = this.state.value.substring(i + 1).indexOf(' ') + i + 1
          const subtext = this.state.value.substring(ii + 1)
          command = 'PRIVMSG'
          args = [this.state.value.substring(i + 1, ii), subtext]
          text = this.state.value
          console.log(text)
          console.log(args)
          console.log(i)
          console.log(ii)
          if (args[0][0] == '#') {
            channel = this.props.connection.channels.find(
              (x, y, z) => x.name == args[0]
            )

            if (!channel) {
              //handles the fact we havnt yet implemented the update to props of joins
              args[1] = 'to: ' + args[0] + ', message: ' + args[1]
              channel = this.props.channel
            }
          } else {
            channel = this.props.channel
          }
        } else {
          //TODO:catch a /JOIN #channel and handle ui for joining channel
          //TODO:cattch a /part and /part #channel and handle ui for it
          //TODO: catch /quit and handle ui for it
          //TODO: handle /NICK stuff.
          //TODO: etc
          command = reres[0].substring(1).toUpperCase()
          args = this.state.value.split(' ').splice(1)
          if (args.length < 1 || args[0] == '') {
            args = [this.props.channel.name]
          }
          text = this.state.value
          channel = this.props.channel
        }
      } else {
        text = this.state.value
        command = 'PRIVMSG'
        args = [this.props.channel.name, this.state.value]
        channel = this.props.channel
      }
      this.props.onSendMessage(
        new MessageFactory({
          text: text,
          sender: this.props.connection.nickname,
          command: command,
          rawCommand: command,
          commandType: 'normal',
          args: args
        }),
        this.props.connection,
        channel!
      )
    } else {
      console.error('Tried to send message without connection or channel')
    }
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Send Message:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
