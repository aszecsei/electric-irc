import * as React from 'react'
import { emoticons, Emojis } from '../emojis'
import { Picker, EmojiData, emojiIndex } from 'emoji-mart'
import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
import { emoji_process } from './message'
declare module 'emojione' {
  export function shortnameToUnicode(str: string): string
}
import * as emojione from 'emojione'

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
    this.setState({ value: this.state.value, emoji_vis: !this.state.emoji_vis })
    return false
  }
  pick_emoji = (emoji: EmojiData) => {
    for (const i of Object.keys(emoticons)) {
      console.log(emoticons[+i], Emojis[emoticons[+i]])
    }
    this.setState({
      value: this.state.value + emoji.native,
      emoji_vis: this.state.emoji_vis
    })
  }
  show() {
    if (this.state.emoji_vis) {
      // custum can be used to add custom emojis, if you wnat to has picker use emoji set other then the native
      // check out 'set' option
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
        <form className={'widthhund'} onSubmit={this.handleSubmit}>
          <a href={'#'} onClick={this.toggle_emoji}>
            ⚡
          </a>
          <label>Send Message:</label>
          <input
            id={'messagebox'}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onClick={event => {
              this.setState({ value: this.state.value, emoji_vis: false })
            }}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
