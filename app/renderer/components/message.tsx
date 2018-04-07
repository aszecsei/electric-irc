import * as React from 'react'
import * as irc from 'irc'
import { Emojis } from '../emojis/index'

import { List } from 'immutable'

//import { MessageEntry } from './messageentry'

//import { Connection } from '../models/connections'
//import { Channel } from '../models/channel'
import { Message } from '../models/message'

interface IMessageProps {
  message: Message
}
function emoji_process(str: string) {
  const emojire = /:[a-z_]+:/i
  var reres = emojire.exec(str)
  var tmpstr = str //tmpstr for loop control
  while (reres != null) {
    if (Emojis.hasOwnProperty(reres[0])) {
      const rere = new RegExp(reres[0], 'gi')
      str = str.replace(rere, Emojis[reres[0]])
    }
    tmpstr = tmpstr.substring(+reres['index'] + reres[0].length - 1)
    reres = emojire.exec(tmpstr)
  }
  return str
}
export const MessageDisp: React.SFC<IMessageProps> = props => {
  if (props.message.command == 'PRIVMSG' && props.message.args[0][0] == '#') {
    //general chat channel message
    return (
      <p className="mmessage">
        {props.message.sender + ': '}
        <br />
        <b className="mmessagetext">{emoji_process(props.message.args[1])}</b>
      </p>
    )
  }
  if (props.message.args.length > 0 && props.message.args[0][0] == '#') {
    //other messages asscociated with channels
    //for other messages like part,join,leave
    var str =
      props.message.sender +
      ' has ' +
      props.message.command +
      ' channel ' +
      props.message.args[0]
    if (props.message.args.length > 1) {
      str = str + ' ('
      var i = 0
      while (i < props.message.args.length) {
        str = str + props.message.args[i] + ', '
        i += 1
      }
      str = str.substring(0, str.length - 2) + ')'
    }
    return <p className="mmessage"> {emoji_process(str)}</p>
  }
  var re = /^[0-9]+$/
  if (
    re.exec(props.message.rawCommand) ||
    props.message.rawCommand == 'NOTICE'
  ) {
    //numbered commands or notices
    str = props.message.command + '(' + props.message.rawCommand + ')'
    if (props.message.args.length > 1) {
      //has args beyond us
      str = str + ': [' //turn list into string
      var i = 0
      while (i < props.message.args.length) {
        str = str + props.message.args[i] + ', '
        i += 1
      }
      str = str.substring(0, str.length - 2) + ']'
    }
    return (
      <p className="mmessage">
        {props.message.sender + ': '}
        <br />
        <b className="mmessagetext">{emoji_process(str)}</b>
      </p>
    )
  }
  if (props.message.command == 'NICK') {
    return (
      <p className="mmessage">
        {props.message.sender +
          ' has changed their name to ' +
          props.message.args[0]}
      </p>
    )
  }
  return (
    <p className="mmessage">
      {props.message.sender + ': '}
      <br />
      <b className="mmessagetext">{emoji_process(props.message.text)}</b>
    </p>
  )
}
