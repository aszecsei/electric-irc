import { expect, use } from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

import { fork, take } from 'redux-saga/effects'
import * as IRC from 'irc'

import * as actions from '../../../app/renderer/actions'
import {
  createIRCClient,
  connect
} from '../../../app/renderer/sagas/handle-server'
import rootSaga, { flow } from '../../../app/renderer/sagas/messaging-saga'

use(sinonChai)

describe('messaging saga', function() {
  describe('create IRC Client', function() {
    const sandbox = sinon.createSandbox()
    const fakeClient = { title: 'Hello!' }
    let res
    let mockIRC
    before(function() {
      mockIRC = sandbox.stub(IRC, 'Client')

      mockIRC.returns(fakeClient)

      res = createIRCClient('irc.freenode.net', 'guest123', ['hello'])
    })

    it('should return an IRC client', function() {
      expect(res).to.eq(fakeClient)
      expect(mockIRC).to.have.been.called
    })

    after(function() {
      sandbox.restore()
    })
  })

  describe('connect', function() {
    const serverName = 'Freenode'
    const payload: actions.IAddServerAction = actions.addServer(
      serverName,
      'irc.freenode.net',
      'guest123',
      ['#electric']
    )
    const sandbox = sinon.createSandbox()
    const fakeClient = { title: 'Hello!' }
    let result
    let mockIRC
    before(function() {
      mockIRC = sandbox.stub(IRC, 'Client').returns(fakeClient)
      result = connect(payload)
    })

    it('should return a new client', function() {
      expect(result.client).to.eq(fakeClient)
      expect(mockIRC).to.have.been.called
    })

    it('should return a new connection', function() {
      expect(result.connection).to.exist
    })

    it('should create a new connection with the appropriate name', function() {
      expect(result.connection.name).to.eq(serverName)
    })

    after(function() {
      sandbox.restore()
    })
  })
})
