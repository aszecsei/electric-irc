import { expect, use } from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { List } from 'immutable'

import * as mAddServer from '../../../app/renderer/reducers/add-server'
import { Connection } from '../../../app/renderer/models/connections'
import { Channel } from '../../../app/renderer/models/channel'
import { addServer } from '../../../app/renderer/actions'
import { ElectricState } from '../../../app/renderer/store'
import { defaultStore } from '../../../app/renderer/reducers/reducers'

import * as IRC from 'irc'

use(sinonChai)

describe('add-server reducer', function() {
  let sandbox: sinon.SinonSandbox

  const prevState = { ...defaultStore }
  let nextState: ElectricState = undefined

  before(function() {
    sandbox = sinon.createSandbox()
    sandbox.stub(IRC, 'Client').returns('Client')
    prevState.connections = List([
      new Connection(0, 'Connection 1', [
        new Channel(1, '#channel1'),
        new Channel(2, '#channel2')
      ])
    ])
  })

  describe('adding a server', function() {
    before(function() {
      nextState = mAddServer.default(
        prevState,
        addServer('Connection 2', 'beep.com', 'username', [
          '#channel3',
          '#channel4'
        ])
      )
    })

    it('has one more connection', function() {
      expect(nextState.connections.count()).to.eq(2)
    })

    it('creates an IRC client', function() {
      expect(IRC.Client).to.have.been.calledOnce
    })
  })

  after(function() {
    sandbox.restore()
  })
})
