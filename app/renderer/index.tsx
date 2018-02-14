import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { ipcRenderer, remote } from 'electron'

import { Titlebar } from './components/titlebar'

import * as irc from 'irc'

import 'material-design-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'
import './stylesheets/main.scss'
<<<<<<< HEAD
import { IMessage } from 'irc'
import { ChatWindow } from './components/ircwindow'

export class Window extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }
=======
import 'bootstrap/dist/css/bootstrap.css'
>>>>>>> bc5f64229a10488a16fb09b8b9433a19be64b79b

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
        <div id="content" className="container-fluid flex row">
          <ChatWindow client={undefined} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Window />, document.getElementById('app'))
