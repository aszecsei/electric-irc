import * as React from 'react'
import { Emojis } from '../emojis'

import { Message } from '../models'

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
  return (
    <p className="mmessage">
      {props.message.sender + ': '}
      <br />
      <b className="mmessagetext">{emoji_process(props.message.text)}</b>
    </p>
  )
}
