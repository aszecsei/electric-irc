import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { ipcRenderer, remote } from 'electron'

import { Titlebar } from './components/titlebar'
import AddModal from './components/addmodal'

import * as irc from 'irc'

import 'material-design-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'
import './stylesheets/main.scss'
import 'bootstrap/dist/css/bootstrap.css'

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
        <div id="content" className="container-fluid flex row">
          <ChatWindow client={undefined} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Window />, document.getElementById('app'))
