import * as React from 'react'
import * as irc from 'irc'

import { List } from 'immutable'

import { MessageEntry } from './messageentry'

import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
import { Message } from '../models/message'

interface IChatWindowProps {
  connection: Connection | undefined
  channel: Channel | undefined
  messages: List<Message> | undefined
  onSendMessage: (message: Message, conn: Connection, channel: Channel) => void
}

export const ChatWindow: React.SFC<IChatWindowProps> = props => {
  return (
    <div>
      {props.messages
        ? props.messages.map((message, i) => <p key={i}>{message.text}</p>)
        : []}
      <MessageEntry
        connection={props.connection}
        channel={props.channel}
        onSendMessage={props.onSendMessage}
      />
    </div>
  )
}
