import * as React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { emoticons, Emojis } from '../emojis'
import { Picker, EmojiData, emojiIndex } from 'emoji-mart'
import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
import { emoji_process } from './message'
import { connect } from 'tls'
import {
  Input
} from 'reactstrap'

interface IChatBoxProps {
  connection?: Connection
  channel?: Channel
  onSendMessage: (message: string, conn: Connection, channel: Channel) => void
}
interface IMessageEntryState {
  value: string
  emoji_vis: boolean
}
export class MessageEntry extends React.Component<
  IChatBoxProps,
  IMessageEntryState
> {
  constructor(props: IChatBoxProps) {
    super(props)
    this.state = { value: '', emoji_vis: false }
  }

  handleChange = (event: any) => {
    this.setState({
      value: emoji_process(event.target.value),
      emoji_vis: this.state.emoji_vis
    })
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
    this.setState({ value: '', emoji_vis: false })
    event.preventDefault()
  }
  toggle_emoji = (event: any) => {
    event.preventDefault()
    this.setState({
      value: this.state.value,
      emoji_vis: !this.state.emoji_vis && this.props.channel !== undefined
    }) // only true if togling when viewing a channel
    return false
  }
  pick_emoji = (emoji: EmojiData) => {
    this.setState({
      value: this.state.value + emoji.native,
      emoji_vis: this.state.emoji_vis
    })
  }
  close_emoji = (event: any) => {
    this.setState({ value: this.state.value, emoji_vis: false })
  }
  show() {
    if (this.state.emoji_vis) {
      // custum can be used to add custom emojis, if you wnat to has picker use emoji set other then the native
      // check out 'set' option, but native set will still only be what's seen outside of picker
      return (
        <Picker
          custom={[]}
          onClick={this.pick_emoji}
          emoji={'zap'}
          title={''}
          native={true}
        />
      )
    }
    return
  }
  // disabledBox() {
  //   // so user cant type when not in a place that could send message, eliminates confusion
  //   if (this.props.channel) {
  //     return (
  //       <input
  //         id={'messagebox'}
  //         type="text"
  //         value={this.state.value}
  //         onChange={this.handleChange}
  //         onClick={this.close_emoji}
  //       />
  //     )
  //   } else {
  //     return <input id={'messagebox'} type="text" value={''} disabled />
  //   }
  // }
  // disabledSubmit() {
  //   // so user cant submit when not in a place that could send message, eliminates confusion
  //   if (this.props.channel) {
  //     return <input type="submit" value="Submit" />
  //   } else {
  //     return <input type="submit" value="Submit" disabled />
  //   }
  // }
  render() {
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="message">Send Message:</Label>
          <Input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            id="message"
          />
          <Button>Submit</Button>
        </FormGroup>
      </Form>
      <div className={'widthhund'}>
        {this.show()}
        <form className={'widthhund'} onSubmit={this.handleSubmit}>
          <a href={'#'} onClick={this.toggle_emoji}>
            ⚡
          </a>
          <label>Send Message:</label>
          <Input 
            id={'messagebox'}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onClick={this.close_emoji}
            disabled={this.props.channel===undefined}
          />
          <input type="submit" value="Submit" disabled={this.props.channel===undefined} />
        </form>
      </div
    )
  }
}
