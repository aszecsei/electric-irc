import * as React from 'react'

import { createStore, applyMiddleware, compose, Store } from 'redux'
import { Provider } from 'react-redux'

import { List } from 'immutable'
import { IAddServerAction } from '../actions'

import createSagaMiddleware from 'redux-saga'
import messageSaga from '../sagas/messaging-saga'

import { defaultReducer, defaultStore } from '../reducers/reducers'

import {
  loadSettings,
  writeSettings,
  loadConnections,
  writeConnections
} from '../utilities/persistent-storage'
import { ElectricState } from '../store'
import { remote } from 'electron'

import { Titlebar } from './titlebar'

import { App } from './app'

export interface IAppLoaderProps {}

export interface IAppLoaderState {
  store?: Store<ElectricState>
}

export class AppLoader extends React.Component<any, IAppLoaderState> {
  constructor(props: IAppLoaderProps) {
    super(props)
    this.state = {
      store: undefined
    }
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

  componentDidMount() {
    const sagaMiddleware = createSagaMiddleware()
    const composeEnhancers =
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    let store: Store<ElectricState>

    loadSettings(defaultStore, (loadedStore: ElectricState) => {
      store = createStore(
        defaultReducer,
        loadedStore,
        composeEnhancers(applyMiddleware(sagaMiddleware))
      )
      // TODO: Start the message listening saga
      sagaMiddleware.run(messageSaga)

      // TODO: Re-join channels as needed
      loadConnections().then((value: any) => {
        const actions = value as List<IAddServerAction>
        actions.forEach(action => {
          store.dispatch(action)
        })
      })

      this.setState({ store })

      store.subscribe(() => {
        const newState = store.getState()
        writeSettings(newState)
        writeConnections(newState)
      })
    })
  }

  render() {
    return (
      <div className="container-fluid app-loader">
        <Titlebar
          draggable={true}
          handleClose={this.handleClose}
          handleMinimize={this.handleMinimize}
          handleMaximize={this.handleMaximize}
        >
          Electric IRC
        </Titlebar>
        {this.state.store ? (
          <Provider store={this.state.store}>
            <App />
          </Provider>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }
}
