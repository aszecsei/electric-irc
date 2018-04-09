import { expect, use } from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

import { fork, take } from 'redux-saga/effects'

import * as actions from '../../../app/renderer/actions'
import { handleServer } from '../../../app/renderer/sagas/handle-server'
import rootSaga, { flow } from '../../../app/renderer/sagas/messaging-saga'

use(sinonChai)

describe('messaging saga', function() {
  describe('root saga', function() {
    it('should fork to the flow generator', function() {
      const gen = rootSaga()
      expect(gen.next().value).to.deep.equal(fork(flow))
    })
  })

  describe('flow', function() {
    const payload = actions.addServer(
      'Freenode',
      'irc.freenode.net',
      'test123',
      []
    )
    let gen, res1, res2, res3
    before(function() {
      gen = flow()
      res1 = gen.next().value
      res2 = gen.next(payload).value
    })

    it('should wait for an ADD_SERVER action', function() {
      expect(res1).to.deep.equal(take(actions.ActionTypeKeys.ADD_SERVER))
    })

    it('should fork to handle a server', function() {
      expect(res2).to.deep.equal(fork(handleServer, payload))
    })
  })
})
