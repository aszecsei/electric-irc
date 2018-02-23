import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { remote } from 'electron'

import { Titlebar } from './components/titlebar'
import AddModal from './components/addmodal'

import 'material-design-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'
import './stylesheets/main.scss'
import 'bootstrap/dist/css/bootstrap.css'

export class Window extends React.Component {
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
          <div>Hello, world! ❤❤❤</div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Window />, document.getElementById('app'))
