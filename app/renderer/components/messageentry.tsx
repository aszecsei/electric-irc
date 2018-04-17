import * as React from 'react'

import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
//import { Message, MessageFactory } from '../models/message'

interface IChatBoxProps {
  connection?: Connection
  channel?: Channel
  onSendMessage: (message: string, conn: Connection, channel: Channel) => void
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
    if (this.props.connection && this.props.channel) {
      this.props.onSendMessage(
        this.state.value,
        this.props.connection,
        this.props.channel
      )
    } else {
      console.error('Tried to send message without connection or channel')
    }
    this.setState({ value: '' })
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
