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
  let addAction: ActionTypes.IAddServerAction
  const expectedYield = fork(rootSaga.handleServer, addAction, 0)
  function connect() {
    rootSaga.connect(addAction, 0)
  }
  it('Should handle correct flow', () => {
    expect(saga.next().value).to.deep.equal(
      take(ActionTypes.ActionTypeKeys.ADD_SERVER)
    )
    expect(saga.next().value).to.deep.equal(expectedYield)
  })
})
//THIS test passes, but causes the test to hang so commented out.
// describe('handle IO logic',() => {
//   const chan1 = new ChannelFactory({ id: 1, name: '#channel1' })
//   const chan2 = new ChannelFactory({ id: 2, name: '#channel2' })
//   const chan3 = new ChannelFactory({ id: 3, name: '#channel3' })
//   let client = rootSaga.createIRCClient('beep.com','fakenick',['test'])
//   const conn1 = new ConnectionFactory({
//     id: 1,
//     name: 'Connection 1',
//     channels: List([chan1, chan2])
//   })
//   const readExpectedYield = fork(rootSaga.read,client,conn1)
//   const writeExpectedYield = fork(rootSaga.write,client,conn1)
//   const saga = rootSaga.handleIO(client,conn1)

//   it('should handle read and write',() => {
//     expect(saga.next().value).to.deep.equal(readExpectedYield)
//     expect(saga.next().value).to.deep.equal(writeExpectedYield)
//   })
// })
