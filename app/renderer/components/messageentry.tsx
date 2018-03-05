import * as React from 'react'
import * as irc from 'irc'

interface IChatBoxProps {
  client?: irc.Client
  channel?: string
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
    if (this.props.client && this.props.channel) {
      this.props.client.say(this.props.channel, this.state.value)
    } else {
      console.error(
        'Tried to connect to chat, but client or channel did not exist.'
      )
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
