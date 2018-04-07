import * as React from 'react'
import * as irc from 'irc'

import { List } from 'immutable'

import { MessageEntry } from './messageentry'
import { MessageDisp } from './message'

import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
import { Message } from '../models/message'

interface IChatWindowProps {
  connection: Connection | undefined
  channel: Channel | undefined
  messages: List<Message> | undefined
  onSendMessage: (message: Message, conn: Connection, channel: Channel) => void
}
export class ChatWindow extends React.Component<IChatWindowProps> {
  constructor(props: IChatWindowProps) {
    super(props)
  }
  componentDidUpdate() {
    var el = this.refs.logWindow as HTMLDivElement
    el.scrollTop = el.scrollHeight
  }
  render() {
    return (
      <div className="chatwindow">
        <div className="logWindow" ref="logWindow">
          {this.props.messages
            ? this.props.messages.map((message, i) => (
                <p key={i} className="outermessage">
                  <MessageDisp message={message} />
                </p>
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
// export const ChatWindow2: React.SFC<IChatWindowProps> = props => {
//   //console.log(props.channel)
//   return (
//     <div className="chatwindow">
//       <div className="logWindow">
//         {props.messages
//           ? props.messages.map((message, i) => (
//               <p key={i} className="outermessage">
//                 <MessageDisp message={message} />
//               </p>
//             ))
//           : []}
//         <input id="hidden_scroll_to"  ref={input => input && input.focus()}/>
//       </div>
//       <div className="sendMessage flex">
//         <MessageEntry
//           connection={props.connection}
//           channel={props.channel}
//           onSendMessage={props.onSendMessage}
//         />
//       </div>
//     </div>
//   )
// }
