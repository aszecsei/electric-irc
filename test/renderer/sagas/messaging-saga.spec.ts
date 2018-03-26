import { expect, use } from 'chai'
import * as sinon from 'sinon'
import { ChannelFactory } from '../../../app/renderer/models/channel'
import * as sinonChai from 'sinon-chai'
import { fork, take, call, put, cancel } from 'redux-saga/effects'
import { List } from 'immutable'
import * as IRC from 'irc'
import * as ActionTypes from '../../../app/renderer/actions'
import { ElectricState } from '../../../app/renderer/store'
import { defaultStore } from '../../../app/renderer/reducers/reducers'
import * as rootSaga from '../../../app/renderer/sagas/messaging-saga'
import { Action } from 'redux'
import {
  Connection,
  ConnectionFactory
} from '../../../app/renderer/models/connections'

use(sinonChai)
describe('root should call flow', () => {
  const saga = rootSaga.default()
  it('should call flow', () => {
    expect(saga.next().value).to.deep.equal(fork(rootSaga.flow))
  })
})
describe('flow logic', () => {
  let prevState = defaultStore
  let nextState: ElectricState = undefined
  const chan3 = new ChannelFactory({ id: 3, name: '#channel3' })
  const saga = rootSaga.flow()
  let sandbox: sinon.SinonSandbox
  before(function() {
    sandbox = sinon.createSandbox()
    sandbox.stub(IRC, 'Client').returns('Client')
    prevState = prevState.set(
      'connections',
      List([
        new ConnectionFactory({
          id: 0,
          name: 'Connection 1',
          channels: List([
            new ChannelFactory({ id: 1, name: '#channel1' }),
            new ChannelFactory({ id: 2, name: '#channel2' })
          ])
        })
      ])
    )
  })
  const payload = {}
  let addAction: ActionTypes.IAddServerAction
  function connect() {
    rootSaga.connect(addAction, 0)
  }
  it('Should handle correct flow', () => {
    expect(saga.next().value).to.deep.equal(
      take(ActionTypes.ActionTypeKeys.ADD_SERVER)
    )
    expect(saga.next().value).to.contain(connect)
    expect(saga.next().value).to.contain(
      put(ActionTypes.addConnection(prevState.connections.get(0)))
    )
  })
})
