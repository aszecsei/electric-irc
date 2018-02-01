import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { remote } from 'electron'

import { Titlebar } from './components/titlebar'

import * as irc from 'irc'

import 'material-design-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'
import './stylesheets/main.scss'
import { IMessage } from 'irc'

interface IWindowState {
  log: Array<string>
}

export class Window extends React.Component<any, IWindowState> {
  client: irc.Client

  constructor(props: any) {
    super(props)
    this.client = new irc.Client('chat.freenode.com', 'ElectricIRC', {
      channels: ['#electric-irc']
    })
    // console.log(this.client)
    this.state = {
      log: []
    }
    this.client.addListener('raw', (message: irc.IMessage) => {
      this.appendToLog(JSON.stringify(message))
    })
    this.client.addListener('error', (message: IMessage) => {
      this.appendToLog('ERROR: ' + message)
    })
  }

  appendToLog(message: string) {
    this.setState((prevState: IWindowState) => {
      return { log: [...prevState.log, message] }
    })
  }

  handleClose(e: any) {
    const window = remote.getCurrentWindow()
    window.close()
  }

  handleMinimize(e: any) {
    const window = remote.getCurrentWindow()
    window.minimize()
  }

  handleMaximize(e: any) {
    const window = remote.getCurrentWindow()
    if (!window.isMaximized()) {
      window.maximize()
    } else {
      window.unmaximize()
    }
  }

  render() {
    return (
      <div>
        <Titlebar
          draggable={true}
          handleClose={this.handleClose}
          handleMinimize={this.handleMinimize}
          handleMaximize={this.handleMaximize}
        >
          Electric IRC
        </Titlebar>
        <div id="content">
          {this.state.log.map((s, i) => <p key={i}>{s}</p>)}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Window />, document.getElementById('app'))
