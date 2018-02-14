import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { ipcRenderer, remote } from 'electron'

import { Titlebar } from './components/titlebar'

import * as irc from 'irc'

import 'material-design-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'
import './stylesheets/main.scss'
import { IMessage } from 'irc'
import { ChatWindow } from './components/ircwindow'

export class Window extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  handleClose = (e: any) => {
    const window = remote.getCurrentWindow()
    window.close()
  }

  handleMinimize = (e: any) => {
    const window = remote.getCurrentWindow()
    window.minimize()
  }

  handleMaximize = (e: any) => {
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
        <ChatWindow client={undefined} />
      </div>
    )
  }
}

ReactDOM.render(<Window />, document.getElementById('app'))
