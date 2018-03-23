import { expect, use } from 'chai'
import { List } from 'immutable'

import { defaultStore } from '../../app/renderer/reducers/reducers'
import {
  ConnectionFactory,
  Connection
} from '../../app/renderer/models/connections'
import { ChannelFactory, Channel } from '../../app/renderer/models/channel'
import {
  getCurrentConnection,
  getCurrentChannel
} from '../../app/renderer/store'

describe('getCurrentConnection', function() {
  const originalState = defaultStore.set(
    'connections',
    List([
      new ConnectionFactory({
        id: 1,
        name: 'Connection 1',
        channels: List([
          new ChannelFactory({ id: 1, name: 'Channel 1' }),
          new ChannelFactory({ id: 2, name: 'Channel 2' })
        ])
      })
    ])
  )
  let resultConn: Connection
  let resultChan: Channel

  describe('with unset current connection and channel', function() {
    before(function() {
      resultConn = getCurrentConnection(originalState)
      resultChan = getCurrentChannel(originalState)
    })

    it('should have undefined current connection', function() {
      expect(resultConn).to.be.undefined
    })

    it('should have undefined current channel', function() {
      expect(resultChan).to.be.undefined
    })
  })

  describe('with unset current connection but set channel', function() {
    const altState = originalState.set('currentChannelId', 1)
    before(function() {
      resultConn = getCurrentConnection(altState)
      resultChan = getCurrentChannel(altState)
    })

    it('should have undefined current connection', function() {
      expect(resultConn).to.be.undefined
    })

    it('should have undefined current channel', function() {
      expect(resultChan).to.be.undefined
    })
  })

  describe('with set current connection but unset channel', function() {
    const altState = originalState.set('currentConnectionId', 1)
    before(function() {
      resultConn = getCurrentConnection(altState)
      resultChan = getCurrentChannel(altState)
    })

    it('should have defined current connection', function() {
      expect(resultConn).to.not.be.undefined
    })

    it('should have the correct connection', function() {
      expect(resultConn.name).to.eq('Connection 1')
    })

    it('should have undefined current channel', function() {
      expect(resultChan).to.be.undefined
    })
  })

  describe('with set current connection and set channel', function() {
    const altState = originalState
      .set('currentConnectionId', 1)
      .set('currentChannelId', 2)
    before(function() {
      resultConn = getCurrentConnection(altState)
      resultChan = getCurrentChannel(altState)
    })

    it('should have defined current connection', function() {
      expect(resultConn).to.not.be.undefined
    })

    it('should have the correct connection', function() {
      expect(resultConn.name).to.eq('Connection 1')
    })

    it('should have defined current channel', function() {
      expect(resultChan).to.not.be.undefined
    })

    it('should have the correct channel', function() {
      expect(resultChan.name).to.eq('Channel 2')
    })
  })
})
