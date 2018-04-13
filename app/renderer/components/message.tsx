import * as React from 'react'
import { Emojis } from '../emojis'
const opn = require('opn')
import { Message } from '../models'

interface IMessageProps {
  message: Message
}
function test(event: any) {
  event.preventDefault()
  var shell = require('shell')
  shell.openExternal(event.target.href)
}
const urlre = /((https?:\/\/)|([a-z0-9]([%0-9a-z\-_~]*[a-z0-9])?@))?[a-z0-9]([%0-9a-z\-_~]*[a-z0-9])?(\.[a-z0-9]([%0-9a-z\-_~]*[a-z0-9])?)+(\:[0-9]+)?(\/[%0-9a-z\-_~.]*)*(\?[^\s]*)?/i
//puts a <a> tag aroung links. keep <text> i purposly made my own html tag, it does not break anything and no errors are caused
// (it's just a warning) the way the framwork works doesn't let me do stuff in loops/maps that return a mix of strings and html
//tags so in order to keep the messages from being formated and styled oddly by the browser implimintation by tags I use a implemented tag
//alls this means is the browser does no self formating on it only css will effect it. this means the text looks as though it was in one
//element
function link_process(str: string) {
  var reres = urlre.exec(str)
  var tempstr = str
  var x = []
  while (reres) {
    if (reres.index > 0) {
      x.push(<text>{emoji_process(tempstr.substring(0, reres.index))}</text>)
    }
    x.push(
      <a href={reres[0]} onClick={test}>
        {reres[0]}
      </a>
    )
    const i = reres.index + reres[0].length
    tempstr = tempstr.substring(i)
    reres = urlre.exec(tempstr)
  }
  if (tempstr.length != 0) {
    x.push(<text>{emoji_process(tempstr)}</text>)
  }
  return x
}
function image_process(str: string) {
  const imgurlre = /https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|bmp|img)/i
  var reres = imgurlre.exec(str)
  if (reres) {
    return <img className="imgPrev" src={reres[0]} />
  }
  return null
}
function emoji_process(str: string): string {
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
function has_sender(message: Message) {
  return (
    <p className="mmessage">
      {link_process(message.sender)}
      <text>{': '}</text>
      <br />
      <b className="mmessagetext">{link_process(message.text)}</b>
      <br />
      {image_process(message.text)}
    </p>
  )
}

function no_sender(message: Message) {
  return (
    <p className="mmessage">
      <b className="mmessagetext">{link_process(message.text)}</b>
      <br />
      {image_process(message.text)}
    </p>
  )
}
export const MessageDisp: React.SFC<IMessageProps> = props => {
  if (!props.message.sender || props.message.sender == '') {
    return no_sender(props.message)
  } else {
    return has_sender(props.message)
  }
}
