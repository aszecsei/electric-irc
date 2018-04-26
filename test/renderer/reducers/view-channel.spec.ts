import { expect, use } from 'chai'
import { List } from 'immutable'

import viewChannelReducer from '../../../app/renderer/reducers/view-channel'
import { ConnectionFactory } from '../../../app/renderer/models/connections'
import { ChannelFactory } from '../../../app/renderer/models/channel'
import { viewChannel } from '../../../app/renderer/actions'
import { ElectricState } from '../../../app/renderer/store'
import { defaultStore } from '../../../app/renderer/reducers/reducers'

import { Guid } from '../../../app/renderer/models/guid'
import * as IRC from 'irc'

describe('view-channel reducer', function() {
  let prevState = defaultStore
  let nextState: ElectricState

  const chan1 = new ChannelFactory({ id: Guid.create(), name: '#channel1' })
  const chan2 = new ChannelFactory({ id: Guid.create(), name: '#channel2' })
  const chan3 = new ChannelFactory({ id: Guid.create(), name: '#channel3' })

  const conn1 = new ConnectionFactory({
    id: Guid.create(),
    name: 'Connection 1',
    channels: List([chan1, chan2])
  })
  const conn2 = new ConnectionFactory({
    id: Guid.create(),
    name: 'Connection 2',
    channels: List([chan3])
  })

  before(function() {
    prevState = prevState.set('connections', List([conn1, conn2]))
  })

  describe('getting conn1 chan1', function() {
    before(function() {
      nextState = viewChannelReducer(prevState, viewChannel(conn1.id, chan1.id))
    })

    it('retrieves conn1', function() {
      expect(nextState.currentConnectionId).to.eq(conn1.id)
    })

    it('retrieves chan1', function() {
      expect(nextState.currentChannelId).to.eq(chan1.id)
    })
  })

  describe('getting conn1 chan2', function() {
    before(function() {
      nextState = viewChannelReducer(prevState, viewChannel(conn1.id, chan2.id))
    })

    it('retrieves conn1', function() {
      expect(nextState.currentConnectionId).to.eq(conn1.id)
    })

    it('retrieves chan2', function() {
      expect(nextState.currentChannelId).to.eq(chan2.id)
    })
  })

  describe('getting conn2 chan3', function() {
    before(function() {
      nextState = viewChannelReducer(prevState, viewChannel(conn2.id, chan3.id))
    })

    it('retrieves conn2', function() {
      expect(nextState.currentConnectionId).to.eq(conn2.id)
    })

    it('retrieves chan3', function() {
      expect(nextState.currentChannelId).to.eq(chan3.id)
    })
  })

  describe('getting conn2 chan1', function() {
    before(function() {
      nextState = viewChannelReducer(prevState, viewChannel(conn2.id, chan1.id))
    })

    it('retrieves conn2', function() {
      expect(nextState.currentConnectionId).to.eq(conn2.id)
    })

    it('retrieves an undefined channel', function() {
      expect(nextState.currentChannelId).to.be.undefined
    })
  })

  describe('getting undefined', function() {
    before(function() {
      nextState = viewChannelReducer(
        prevState,
        viewChannel(undefined, undefined)
      )
    })

    it('retrieves an undefined connection', function() {
      expect(nextState.currentConnectionId).to.be.undefined
    })

    it('retrieves an undefined channel', function() {
      expect(nextState.currentChannelId).to.be.undefined
    })
  })
})
