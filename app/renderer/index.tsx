import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { remote } from 'electron'

import { defaultReducer, defaultStore } from './reducers/reducers'

import { Titlebar } from './components/titlebar'
import SidebarContainer from './containers/sidebar-container'
import AddModalContainer from './containers/add-modal-container'
import ChatWindowContainer from './containers/irc-window-container'

import * as irc from 'irc'

import 'material-design-icons/iconfont/material-icons.css'

import 'typeface-roboto/index.css'
import './stylesheets/main.scss'
import 'bootstrap/dist/css/bootstrap.css'

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

        <AddModalContainer />

        <div id="content" className="flex container-fluid">
          <SidebarContainer />
          <ChatWindowContainer />
        </div>
      </div>
    )
  }
}

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  defaultReducer,
  defaultStore,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
// TODO: Start the message listening saga

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
