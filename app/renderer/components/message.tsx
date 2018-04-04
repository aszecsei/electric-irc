import * as React from 'react'
import * as irc from 'irc'

import { List } from 'immutable'

//import { MessageEntry } from './messageentry'

//import { Connection } from '../models/connections'
//import { Channel } from '../models/channel'
import { Message } from '../models/message'

interface IMessageProps {
  message: Message
}
export const MessageDisp: React.SFC<IMessageProps> = props => {
  if (props.message.command == 'PRIVMSG' && props.message.args[0][0] == '#') {
    return <span> {props.message.sender + ': ' + props.message.args[1]}</span>
  }
  if (props.message.args.length > 0 && props.message.args[0][0] == '#') {
    //for other messages like part,join,leave
    var str =
      props.message.sender +
      ' has ' +
      props.message.command +
      ' channel ' +
      props.message.args[0]
    if (props.message.args.length > 1) {
      str = str + ' ('
      var i = 1
      while (i < props.message.args.length) {
        str = str + props.message.args[i] + ', '
        i += 1
      }
      str = str.substring(0, str.length - 2) + ')'
    }
    return <span> {str}</span>
  }
  return <span>{props.message.text}</span>
}
