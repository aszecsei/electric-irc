import * as React from 'react'
import { Emojis, emoticons } from '../emojis'
// import opn from 'opn'
// see https://www.npmjs.com/package/dateformat for details
import * as dateFormat from 'dateformat'
import { Message,Settings } from '../models'
const opn = require('opn')
interface IMessageProps {
  message: Message
  settings:Settings
}
function test(event: any) {
  event.preventDefault()
  opn(event.target.href as string)
}
const urlre = /((https?:\/\/)|([a-z0-9]([%0-9a-z\-_~]*[a-z0-9])?@))?[a-z0-9]([%0-9a-z\-_~]*[a-z0-9])?(\.[a-z0-9]([%0-9a-z\-_~]*[a-z0-9])?)+(\:[0-9]+)?(\/[%0-9a-z\-_~.]*)*(\?[^\s]*)?/i
// puts a <a> tag aroung links. keep <text> i purposly made my own html tag, it does not break anything and no errors are caused
// (it's just a warning) the way the framwork works doesn't let me do stuff in loops/maps that return a mix of strings and html
// tags so in order to keep the messages from being formated and styled oddly by the browser implimintation by tags I use a implemented tag
// alls this means is the browser does no self formating on it only css will effect it. this means the text looks as though it was in one
// element
function link_process(str: string) {
  let reres = urlre.exec(str)
  let tempstr = str
  const x = []
  let ii = 0
  while (reres) {
    if (reres.index > 0) {
      x.push(
        <span key={ii}>{emoji_process(tempstr.substring(0, reres.index))}</span>
      )
      ii++
    }
    x.push(
      <a
        key={ii}
        href={reres[2] ? reres[0] : 'http://' + reres[0]}
        onClick={test}
      >
        {reres[0]}
      </a>
    )
    ii++
    const i = reres.index + reres[0].length
    tempstr = tempstr.substring(i)
    reres = urlre.exec(tempstr)
  }
  if (tempstr.length !== 0) {
    x.push(<span key={ii}>{emoji_process(tempstr)}</span>)
  }
  return x
}
function image_process(str: string) {
  const imgurlre = /((https?:\/\/)|([a-z0-9]([%0-9a-z\-_~]*[a-z0-9])?@))?[a-z0-9]([%0-9a-z\-_~]*[a-z0-9])?(\.[a-z0-9]([%0-9a-z\-_~]*[a-z0-9])?)+(\:[0-9]+)?(\/[%0-9a-z\-_~.]*)*\.(jpg|jpeg|png|gif|bmp|img)(\?[^\s]*)?/i
  const reres = imgurlre.exec(str)
  if (reres) {
    return <img className="imgPrev" src={reres[0]} />
  }
  return null
}
export function emoji_process(str: string): string {
  const emojire = /:[^\s:]+:/i
  let reres = emojire.exec(str)
  let tmpstr = str // tmpstr for loop control
  let newstr = ''
  while (reres !== null) {
    if (Emojis[reres[0]]) {
      newstr = newstr + tmpstr.slice(0, reres.index) + Emojis[reres[0]]
      tmpstr = tmpstr.substring(+reres.index + reres[0].length)
    } else {
      newstr = newstr + tmpstr.slice(0, reres.index + reres[0].length - 1)
      tmpstr = tmpstr.substring(+reres.index + reres[0].length - 1)
    }
    reres = emojire.exec(tmpstr)
  }
  newstr = newstr + tmpstr
  for (const i of Object.keys(emoticons)) {
    // replaces shortcuts too like :D
    // could manually make a regex to include eac one but that sounds like a pain
    newstr = newstr.replace(emoticons[+i], Emojis[emoticons[+i]])
  }
  return newstr
}
function showTime(message:Message,settings:Settings){
  if(settings.timestamps){
    const now=new Date()
    if(message.sent.getFullYear()===now.getFullYear() 
    && message.sent.getMonth()===now.getMonth()
    && message.sent.getDate()===now.getDate()){
      return <span className="time">{"(today)"+dateFormat(message.sent,settings.timeformat)}</span>
    }else{
      return <span className="time">{dateFormat(message.sent,settings.timeformat)}</span>
    }
  }
  return null
}
function has_sender(message: Message,settings:Settings) {
  return (
    <p className="mmessage">
      {link_process(message.sender)}
      <span>: </span>
      {showTime(message,settings)}
      <br />
      <b className="mmessagetext">{link_process(message.text)}</b>
      <br />
      {image_process(message.text)}
    </p>
  )
}

function no_sender(message: Message,settings:Settings) {
  return (
    <p className="mmessage">
      {showTime(message,settings)}
      <br />
      <b className="mmessagetext">{link_process(message.text)}</b>
      <br />
      {image_process(message.text)}
    </p>
  )
}
export const MessageDisp: React.SFC<IMessageProps> = props => {
  if (!props.message.sender || props.message.sender === '') {
    return no_sender(props.message,props.settings)
  } else {
    return has_sender(props.message,props.settings)
  }
}
