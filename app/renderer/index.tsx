import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { remote } from 'electron'

import { defaultReducer, defaultStore } from './reducers/reducers'

import { Titlebar } from './components/titlebar'
import { Sidebar } from './components/sidebar'

import * as irc from 'irc'

import 'material-design-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'
import './stylesheets/main.scss'
import 'bootstrap/dist/css/bootstrap.css'

import { ChatWindow } from './components/ircwindow'

interface IAppState {
  currentIRCClient?: irc.Client
  currentIRCChannel?: string
}

export class App extends React.Component<any, IAppState> {
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

        <div id="content" className="flex container-fluid">
          <Sidebar onClicked={this.setChatWindow} />
          <ChatWindow
            client={this.state.currentIRCClient}
            channel={this.state.currentIRCChannel}
          />
        </div>
      </div>
    )
  }
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  defaultReducer,
  defaultStore,
  applyMiddleware(sagaMiddleware)
)
// TODO: Start the message listening saga

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
