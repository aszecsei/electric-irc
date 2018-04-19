import * as React from 'react'

import { createStore, applyMiddleware, compose, Store } from 'redux'
import { Provider } from 'react-redux'

import createSagaMiddleware from 'redux-saga'
import messageSaga from '../sagas/messaging-saga'

import { defaultReducer, defaultStore } from '../reducers/reducers'

import { loadSettings } from '../utilities/load-settings'
import { ElectricState } from '../store'

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

      this.setState({ store })
    })
  }

  render() {
    return this.state.store ? (
      <Provider store={this.state.store}>
        <App />
      </Provider>
    ) : (
      <p>Loading...</p>
    )
  }
}
