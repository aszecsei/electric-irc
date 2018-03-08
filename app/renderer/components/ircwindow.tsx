import * as React from 'react'
import * as irc from 'irc'

import { MessageEntry } from './messageentry'

interface IChatWindowState {
  log: Array<string>
}

interface IChatWindowProps {
  client?: irc.Client
  channel?: string
}

export class ChatWindow extends React.Component<
  IChatWindowProps,
  IChatWindowState
> {
  constructor(props: IChatWindowProps) {
    super(props)
    // console.log(this.client)
    this.state = {
      log: []
    }
    this.bindClient()
  }

  bindClient = () => {
    if (this.props.client) {
      this.props.client.addListener('raw', (message: irc.IMessage) => {
        this.appendToLog(JSON.stringify(message))
      })
      this.props.client.addListener('error', (message: irc.IMessage) => {
        this.appendToLog('ERROR: ' + message)
      })
    }
  }

  appendToLog = (message: string) => {
    this.setState((prevState: IChatWindowState) => {
      return { log: [...prevState.log, message] }
    })
  }

  render() {
    return (
      <div>
        {this.state.log.map((s, i) => <p key={i}>{s}</p>)}
        <MessageEntry client={this.props.client} channel={this.props.channel} />
      </div>
    )
  }
}
