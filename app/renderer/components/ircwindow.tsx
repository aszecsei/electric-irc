import * as React from 'react'

import { List } from 'immutable'

import { MessageEntry } from './messageentry'
import { MessageDisp } from './message'

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
export class ChatWindow extends React.Component<IChatWindowProps> {
  private logWindow?: HTMLDivElement

  constructor(props: IChatWindowProps) {
    super(props)
  }
  componentDidUpdate() {
    if (this.logWindow) {
      this.logWindow.scrollTop = this.logWindow.scrollHeight
    }
  }
  render() {
    return (
      <div className="chatwindow">
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
                  // and matches search===true
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
