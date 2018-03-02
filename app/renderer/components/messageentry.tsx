import * as React from 'react'
import * as irc from 'irc'

interface IChatBoxProps {
  client?: irc.Client
}
type valueState = { value: string }
export default class MessageEntry extends React.Component<
  IChatBoxProps,
  valueState
> {
  constructor(props: IChatBoxProps) {
    super(props)
    this.state = { value: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event: any) {
    this.setState({ value: event.target.text })
  }
  handleSubmit(event: any) {
    //   this.props.client.say(irc.Client.channel,this.state.value);
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
