import { expect, use } from 'chai'
import { List } from 'immutable'

import viewChannelReducer from '../../../app/renderer/reducers/view-channel'
import { Connection } from '../../../app/renderer/models/connections'
import { Channel } from '../../../app/renderer/models/channel'
import { viewChannel } from '../../../app/renderer/actions'
import { ElectricState } from '../../../app/renderer/store'
import { defaultStore } from '../../../app/renderer/reducers/reducers'

import * as IRC from 'irc'

describe('view-channel reducer', function() {
  const prevState = { ...defaultStore }
  let nextState: ElectricState = undefined

  const chan1 = new Channel(1, '#channel1')
  const chan2 = new Channel(2, '#channel2')
  const chan3 = new Channel(3, '#channel3')

  const conn1 = new Connection(1, 'Connection 1', [chan1, chan2])
  const conn2 = new Connection(2, 'Connection 2', [chan3])

  before(function() {
    prevState.connections = List([conn1, conn2])
  })

  describe('getting conn1 chan1', function() {
    before(function() {
      nextState = viewChannelReducer(prevState, viewChannel(conn1.id, chan1.id))
    })

    it('retrieves conn1', function() {
      expect(nextState.currentConnection).to.eq(conn1)
    })

    it('retrieves chan1', function() {
      expect(nextState.currentChannel).to.eq(chan1)
    })
  })

  describe('getting conn1 chan2', function() {
    before(function() {
      nextState = viewChannelReducer(prevState, viewChannel(conn1.id, chan2.id))
    })

    it('retrieves conn1', function() {
      expect(nextState.currentConnection).to.eq(conn1)
    })

    it('retrieves chan2', function() {
      expect(nextState.currentChannel).to.eq(chan2)
    })
  })

  describe('getting conn2 chan3', function() {
    before(function() {
      nextState = viewChannelReducer(prevState, viewChannel(conn2.id, chan3.id))
    })

    it('retrieves conn2', function() {
      expect(nextState.currentConnection).to.eq(conn2)
    })

    it('retrieves chan3', function() {
      expect(nextState.currentChannel).to.eq(chan3)
    })
  })

  describe('getting conn2 chan1', function() {
    before(function() {
      nextState = viewChannelReducer(prevState, viewChannel(conn2.id, chan1.id))
    })

    it('retrieves conn2', function() {
      expect(nextState.currentConnection).to.eq(conn2)
    })

    it('retrieves an undefined channel', function() {
      expect(nextState.currentChannel).to.be.undefined
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
      expect(nextState.currentConnection).to.be.undefined
    })

    it('retrieves an undefined channel', function() {
      expect(nextState.currentChannel).to.be.undefined
    })
  })
})
