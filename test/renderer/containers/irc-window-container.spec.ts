import { expect, use } from 'chai'
import * as sinon from 'sinon'

import { defaultStore } from '../../../app/renderer/reducers/reducers'

import {
  mapStateToProps,
  mapDispatchToProps
} from '../../../app/renderer/containers/irc-window-container'
import { List } from 'immutable'
import {
  Connection,
  ConnectionFactory,
  Guid,
  Channel,
  ChannelFactory
} from '../../../app/renderer/models'
import { sendMessage } from '../../../app/renderer/actions'

const configureMockStore = require('redux-mock-store')

const initialState = defaultStore

describe('map state to props', function() {
  const conn1GUID = Guid.create()
  const conn2GUID = Guid.create()
  const chann1GUID = Guid.create()
  const chann2GUID = Guid.create()
  const connections = List<Connection>([
    new ConnectionFactory({
      name: 'Conn 1',
      id: conn1GUID,
      channels: List<Channel>([
        new ChannelFactory({ name: 'Channel 1', id: chann1GUID }),
        new ChannelFactory({ name: 'Channel 2', id: chann2GUID })
      ])
    }),
    new ConnectionFactory({ name: 'Conn 2', id: conn2GUID })
  ])
  const currentState = initialState.set('connections', connections)

  describe('without a set connection', function() {
    const mState = currentState.set('currentConnectionId', undefined)

    it('should not have anything defined', function() {
      const res = mapStateToProps(mState)
      expect(res.channel).to.be.undefined
      expect(res.connection).to.be.undefined
      expect(res.messages).to.be.undefined
    })
  })

  describe('without a set channel', function() {
    const mState = currentState.set('currentConnectionId', conn2GUID)

    it('should only have a connection defined', function() {
      const res = mapStateToProps(mState)
      expect(res.channel).to.be.undefined
      expect(res.connection.name).to.eq('Conn 2')
      expect(res.messages).to.be.undefined
    })
  })

  describe('with a set channel', function() {
    const mState = currentState
      .set('currentConnectionId', conn1GUID)
      .set('currentChannelId', chann2GUID)

    it('should only have a connection defined', function() {
      const res = mapStateToProps(mState)
      expect(res.channel.name).to.eq('Channel 2')
      expect(res.connection.name).to.eq('Conn 1')
    })
  })
})

describe('map dispatch to props', function() {
  const fakeDispatch = sinon.spy()
  const res = mapDispatchToProps(fakeDispatch)

  describe('on send message', function() {
    it('is a function', function() {
      expect(res)
        .to.have.property('onSendMessage')
        .that.is.a('function')
    })

    it('should dispatch an action', function() {
      const channGUID = Guid.create()
      const chann = new ChannelFactory({
        name: 'Channel',
        id: channGUID
      })

      const connGUID = Guid.create()
      const conn = new ConnectionFactory({
        name: 'Connection 1',
        id: connGUID,
        channels: List<Channel>([chann])
      })
      res.onSendMessage('Hello!', conn, chann)
      expect(fakeDispatch).to.have.been.calledWith(
        sendMessage(connGUID, channGUID, 'Hello!')
      )
    })
  })
})
