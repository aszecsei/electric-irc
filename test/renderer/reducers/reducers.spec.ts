import { expect, use } from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { List } from 'immutable'

import { defaultStore } from '../../../app/renderer/reducers/reducers'
import { defaultReducer } from '../../../app/renderer/reducers/reducers'
import { ElectricState } from '../../../app/renderer/store'

import * as Actions from '../../../app/renderer/actions'

import * as addConnectionReducer from '../../../app/renderer/reducers/add-connection'
import * as appendLogReducer from '../../../app/renderer/reducers/append-log'
import * as editServerReducer from '../../../app/renderer/reducers/edit-server'
import * as joinChannelReducer from '../../../app/renderer/reducers/join-channel'
import * as removeServerReducer from '../../../app/renderer/reducers/remove-server'
import * as viewChannelReducer from '../../../app/renderer/reducers/view-channel'
import { MessageFactory } from '../../../app/renderer/models/message'
import { ConnectionFactory } from '../../../app/renderer/models/connections'
import { ChannelFactory } from '../../../app/renderer/models/channel'

use(sinonChai)

describe('default store', function() {
  it('should have no connections', function() {
    expect(defaultStore.connections.count()).to.eq(0)
  })

  it('should have no current channel', function() {
    expect(defaultStore.currentChannelId).to.be.undefined
  })

  it('should have no current connection', function() {
    expect(defaultStore.currentConnectionId).to.be.undefined
  })

  it('should have no last used channel ID', function() {
    expect(defaultStore.lastUsedChannelId).to.eq(0)
  })

  it('should have no last used connection ID', function() {
    expect(defaultStore.lastUsedConnectionId).to.eq(0)
  })
})

describe('default reducer', function() {
  let sandbox: sinon.SinonSandbox

  const initialState = { ...defaultStore }
  const alteredState = { ...initialState }
  let result: ElectricState

  before(function() {
    alteredState.lastUsedChannelId = 100
    alteredState.lastUsedConnectionId = 2

    sandbox = sinon.createSandbox()
    sandbox.stub(addConnectionReducer, 'default').returns(alteredState)
    sandbox.stub(appendLogReducer, 'default').returns(alteredState)
    sandbox.stub(editServerReducer, 'default').returns(alteredState)
    sandbox.stub(joinChannelReducer, 'default').returns(alteredState)
    sandbox.stub(removeServerReducer, 'default').returns(alteredState)
    sandbox.stub(viewChannelReducer, 'default').returns(alteredState)
  })

  after(function() {
    sandbox.restore()
  })

  describe('add connection', function() {
    before(function() {
      result = undefined
      result = defaultReducer(
        initialState,
        Actions.addConnection(
          new ConnectionFactory({
            name: 'Server Name',
            url: 'Server URL',
            nickname: 'Nickname',
            channels: List([
              new ChannelFactory({
                name: '#channel1'
              }),
              new ChannelFactory({
                name: '#channel2'
              })
            ])
          })
        )
      )
    })

    it('should call the addConnection reducer', function() {
      expect(addConnectionReducer.default).to.be.calledOnce
    })

    it('should alter the state', function() {
      expect(result).to.eq(alteredState)
    })
  })

  describe('append log', function() {
    before(function() {
      result = undefined
      result = defaultReducer(
        initialState,
        Actions.appendLog(1, 2, new MessageFactory({ text: 'Text' }))
      )
    })

    it('should call the appendLog reducer', function() {
      expect(appendLogReducer.default).to.be.calledOnce
    })

    it('should alter the state', function() {
      expect(result).to.eq(alteredState)
    })
  })

  describe('edit server', function() {
    before(function() {
      result = undefined
      result = defaultReducer(
        initialState,
        Actions.editServer(0, 'New Name', 'New URL')
      )
    })

    it('should call the edit server reducer', function() {
      expect(editServerReducer.default).to.be.calledOnce
    })

    it('should alter the state', function() {
      expect(result).to.eq(alteredState)
    })
  })

  describe('join channel', function() {
    before(function() {
      result = undefined
      result = defaultReducer(initialState, Actions.joinChannel(10, '#hello'))
    })

    it('should call the join channel reducer', function() {
      expect(joinChannelReducer.default).to.be.calledOnce
    })

    it('should alter the state', function() {
      expect(result).to.eq(alteredState)
    })
  })

  describe('remove server', function() {
    before(function() {
      result = undefined
      result = defaultReducer(initialState, Actions.removeServer(2))
    })

    it('should call the remove server reducer', function() {
      expect(removeServerReducer.default).to.be.calledOnce
    })

    it('should alter the state', function() {
      expect(result).to.eq(alteredState)
    })
  })

  describe('view channel', function() {
    before(function() {
      result = undefined
      result = defaultReducer(initialState, Actions.viewChannel(2, 5))
    })

    it('should call the view channel reducer', function() {
      expect(viewChannelReducer.default).to.be.calledOnce
    })

    it('should alter the state', function() {
      expect(result).to.eq(alteredState)
    })
  })

  describe('unknown', function() {
    before(function() {
      result = undefined
      result = defaultReducer(initialState, { type: 'UNKNOWN' })
    })

    it('should return the initial state', function() {
      expect(result).to.eq(initialState)
    })
  })
})
