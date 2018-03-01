import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { ipcRenderer, remote } from 'electron'

import { Titlebar } from './components/titlebar'

import AddModal from './components/addmodal'
import { Sidebar } from './components/sidebar'

import * as irc from 'irc'


import 'material-design-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'
import './stylesheets/main.scss'
import 'bootstrap/dist/css/bootstrap.css'

import { ChatWindow } from './components/ircwindow'

interface IWindowState {
  currentIRCClient?: irc.Client
  currentIRCChannel?: string
}

export class Window extends React.Component<any, IWindowState> {
  constructor(props: any) {
    super(props)
    this.state = {}
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

  setChatWindow = (client: irc.Client, channel: string) => {
    this.setState({
      currentIRCClient: client,
      currentIRCChannel: channel
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <Titlebar
          draggable={true}
          handleClose={this.handleClose}
          handleMinimize={this.handleMinimize}
          handleMaximize={this.handleMaximize}
        >
          Electric IRC
        </Titlebar>
        <AddModal />


        <div id="content" className="flex container-fluid">
          <Sidebar onClicked={this.setChatWindow} />
          <ChatWindow client={this.state.currentIRCClient} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Window />, document.getElementById('app'))
