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
  value: string,
  numShow:number
}
const defaultState = {
  numShow: 50,
  value: ""
}
export class ChatWindow extends React.Component<IChatWindowProps,IChatWindowState> {
  private logWindow?: HTMLDivElement
  private noDidUp:boolean
  constructor(props: IChatWindowProps) {
    super(props)
    this.state={...defaultState}
    this.noDidUp=false
  }
  
  handleChange = (event: any) => {
    this.setState({
      value: event.target.value
    })
  }
  componentDidUpdate() {
    if (!this.noDidUp&&this.logWindow) {
      this.logWindow.scrollTop = this.logWindow.scrollHeight
    }
    this.noDidUp=false
  }
  addfifty=()=>{
    this.noDidUp=true
    const size=this.props.messages?this.props.messages.size:0
    this.setState({numShow:this.state.numShow+50>size?size:this.state.numShow+50})
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
          {this.props.messages&&this.state.numShow<this.props.messages.size?<div  id="more"><a href="#" onClick={this.addfifty}>50 more</a></div>:null}
          {this.props.messages
            ? this.props.messages.slice(this.props.messages.size-this.state.numShow).filter(
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
