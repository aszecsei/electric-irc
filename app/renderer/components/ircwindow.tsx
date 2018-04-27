import * as React from 'react'

import { List } from 'immutable'

import { MessageEntry } from './messageentry'
import { MessageDisp } from './message'
import {Input} from 'reactstrap'
import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
import { Message,MessageType } from '../models/message'
import {Settings } from '../models/settings'

interface IChatWindowProps {
  connection: Connection | undefined
  channel: Channel | undefined
  messages: List<Message> | undefined
  settings:Settings
  onSendMessage: (message: string, conn: Connection, channel: Channel) => void
}

interface IChatWindowState {
  value: string
}
export class ChatWindow extends React.Component<IChatWindowProps,IChatWindowState> {
  private logWindow?: HTMLDivElement

  constructor(props: IChatWindowProps) {
    super(props)
    this.state= {
      value: ""
    }
  }

  handleChange = (event: any) => {
    this.setState({
      value: event.target.value
    })
  }
  componentDidUpdate() {
    if (this.logWindow) {
      this.logWindow.scrollTop = this.logWindow.scrollHeight
    }
  }
  render() {
    return (
      <div className="chatwindow">
        <div className="filter">
        <Input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                id={'filterbox'}
                placeholder={'Filter messages'}
              />
        </div>
        <div
          className="logWindow"
          ref={ref => (this.logWindow = ref ? ref : undefined)}
        >
          {this.props.messages
            ? this.props.messages.filter(
              // filter out join and/or nick change messages if coorisponding options enabled
                (m)=>(
                  !(
                    (m.type===MessageType.JOIN && this.props.settings.hidejoin)
                    ||(m.type===MessageType.NICKCHANGE && this.props.settings.hidenicknamechange)
                  )
                  &&(m.text.toLowerCase().match(this.state.value.toLowerCase()))// and matches search===true
                )
              ).map((message, i) => (
                <div key={i} className="outermessage">
                  <MessageDisp message={message} settings={this.props.settings} />
                </div>
              ))
            : []}
        </div>
        <div className="sendMessage flex">
          <MessageEntry
            connection={this.props.connection}
            channel={this.props.channel}
            onSendMessage={this.props.onSendMessage}
          />
        </div>
      </div>
    )
  }
}
