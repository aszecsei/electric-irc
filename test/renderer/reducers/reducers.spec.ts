import { expect, use } from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { List } from 'immutable'

import {
  defaultReducer,
  defaultStore
} from '../../../app/renderer/reducers/reducers'
import { ElectricState } from '../../../app/renderer/store'

import * as Actions from '../../../app/renderer/actions'

import * as addConnectionReducer from '../../../app/renderer/reducers/add-connection'
import * as appendLogReducer from '../../../app/renderer/reducers/append-log'
import * as editServerReducer from '../../../app/renderer/reducers/edit-server'
import * as addChannelReducer from '../../../app/renderer/reducers/add-channel'
import * as removeServerReducer from '../../../app/renderer/reducers/remove-server'
import * as viewChannelReducer from '../../../app/renderer/reducers/view-channel'
import * as toggleAddReducer from '../../../app/renderer/reducers/toggle-add-server-modal'
import * as toggleSettingReducer from '../../../app/renderer/reducers/toggle-settings-modal'
import * as changeSettingsReducer from '../../../app/renderer/reducers/change-settings'
import * as toggleTabReducer from '../../../app/renderer/reducers/toggle-tab'
import * as toggleAddChannelReducer from '../../../app/renderer/reducers/toggle-add-channel-modal'
import * as themeWholesaleReducer from '../../../app/renderer/reducers/theme-wholesale'
import { MessageFactory } from '../../../app/renderer/models/message'
import { ConnectionFactory } from '../../../app/renderer/models/connections'
import { ChannelFactory } from '../../../app/renderer/models/channel'
import { Guid } from '../../../app/renderer/models'

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
})

describe('default reducer', function() {
  let sandbox: sinon.SinonSandbox

  const initialState = { ...defaultStore }
  const alteredState = { ...initialState }
  let result: ElectricState

  before(function() {
    sandbox = sinon.createSandbox()
    sandbox.stub(addConnectionReducer, 'default').returns(alteredState)
    sandbox.stub(appendLogReducer, 'default').returns(alteredState)
    sandbox.stub(editServerReducer, 'default').returns(alteredState)
    sandbox.stub(addChannelReducer, 'default').returns(alteredState)
    sandbox.stub(removeServerReducer, 'default').returns(alteredState)
    sandbox.stub(viewChannelReducer, 'default').returns(alteredState)
    sandbox.stub(toggleAddReducer, 'default').returns(alteredState)
    sandbox.stub(toggleSettingReducer, 'default').returns(alteredState)
    sandbox.stub(toggleAddChannelReducer, 'default').returns(alteredState)
    sandbox.stub(toggleTabReducer, 'default').returns(alteredState)
    sandbox.stub(changeSettingsReducer, 'default').returns(alteredState)
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
        Actions.appendLog(
          Guid.create(),
          Guid.create(),
          new MessageFactory({ text: 'Text' })
        )
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
        Actions.editServer(Guid.create(), 'New Name', 'New URL')
      )
    })

    it('should call the edit server reducer', function() {
      expect(editServerReducer.default).to.be.calledOnce
    })

    it('should alter the state', function() {
      expect(result).to.eq(alteredState)
    })
  })

  describe('add channel', function() {
    before(function() {
      result = undefined
      result = defaultReducer(
        initialState,
        Actions.addChannel(
          Guid.create(),
          new ChannelFactory({
            name: 'Hello!'
          })
        )
      )
    })

    it('should call the join channel reducer', function() {
      expect(addChannelReducer.default).to.be.calledOnce
    })

    it('should alter the state', function() {
      expect(result).to.eq(alteredState)
    })
  })

  describe('remove server', function() {
    before(function() {
      result = undefined
      result = defaultReducer(initialState, Actions.removeServer(Guid.create()))
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
      result = defaultReducer(
        initialState,
        Actions.viewChannel(Guid.create(), Guid.create())
      )
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

  describe('toggle channel', function() {
    before(function() {
      result = undefined
      result = defaultReducer(
        initialState,
        Actions.toggleAddChannelModal(Guid.create())
      )
    })

    it('should call the toggle add channel reducer', function() {
      expect(toggleAddChannelReducer.default).to.be.calledOnce
    })

    it('should alter the state', function() {
      expect(result).to.eq(alteredState)
    })
  })
    describe('toggle add sever modal', function() {
        before(function () {
            result = undefined
            result = defaultReducer(
                initialState,
                Actions.toggleAddServerModal(true)
            )
        })

        it('should call the view channel reducer', function () {
            expect(toggleAddReducer.default).to.be.calledOnce
        })

        it('should alter the state', function () {
            expect(result).to.eq(alteredState)
        })
    })
    describe('toggle settings modal', function() {
        before(function () {
            result = undefined
            result = defaultReducer(
                initialState,
                Actions.toggleSettingsModal(true)
            )
        })

        it('should call the view channel reducer', function () {
            expect(toggleSettingReducer.default).to.be.calledOnce
        })

        it('should alter the state', function () {
            expect(result).to.eq(alteredState)
        })
    })
    describe('toggle tab in settings modal', function() {
        before(function () {
            result = undefined
            result = defaultReducer(
                initialState,
                Actions.toggleSettingsTab("1")
            )
        })

        it('should call the view channel reducer', function () {
            expect(toggleTabReducer.default).to.be.calledOnce
        })

        it('should alter the state', function () {
            expect(result).to.eq(alteredState)
        })
    })
})
