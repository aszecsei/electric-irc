import * as React from 'react'
import { emoticons, Emojis } from '../emojis'
import { Picker, EmojiData, emojiIndex } from 'emoji-mart'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
import { emoji_process } from './message'
import { connect } from 'tls'

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
    // this.state = { value: 'Disable Until in A Channel', emoji_vis: false } // this will stay in box
    // not convienient once in channel. insead put string see function disabledString
      
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
  disabledString(){// to display disabled message in box when not viewing channel
    return this.props.channel?this.state.value:"Disable Until in A Channel"
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
  render() {
    return (
      <div className={'widthhund'}>
        {this.show()}
        <Form className={'widthhund mForm mcenter'} onSubmit={this.handleSubmit}>
        <FormGroup className="mformgroup mcenter">
          <a href={'#'} onClick={this.toggle_emoji}>
            ⚡
          </a>
          <Label>Send Message:</Label>
          <Input 
            id={'messagebox'}
            type="text"
            value={this.disabledString()}
            onChange={this.handleChange}
            onClick={this.close_emoji}
            disabled={this.props.channel===undefined}
          />
          <Input className="msubmit" type="submit" value="Submit" disabled={this.props.channel===undefined} />
          </FormGroup>
        </Form>
      </div>      
    )
  }
}
