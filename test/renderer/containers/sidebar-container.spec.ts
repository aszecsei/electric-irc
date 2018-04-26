import { expect, use } from 'chai'
import * as sinon from 'sinon'

import { defaultStore } from '../../../app/renderer/reducers/reducers'

import {
  mapStateToProps,
  mapDispatchToProps
} from '../../../app/renderer/containers/sidebar-container'
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
describe('sidebar-container', function() {
  describe('map state to props', function() {
    it('return obj with the appropriote values from state', function() {
      const res = mapStateToProps(currentState)
      expect(res.connections).to.be.equal(connections)
      expect(res.curChanID).to.be.equal(undefined)
    })
  })

  describe('map dispatch to props', function() {
    const fakeDispatch = sinon.spy()
    const res = mapDispatchToProps(fakeDispatch)

    describe('onChannelClick', function() {
      it('is a function', function() {
        expect(res)
          .to.have.property('onChannelClick')
          .that.is.a('function')
      })

      it('should dispatch an action', function() {
        res.onChannelClick(
          connections.first(),
          connections.first().channels.first()
        )
        expect(fakeDispatch).to.have.been.called
      })
    })
    describe('onAddServerClick', function() {
      it('is a function', function() {
        expect(res)
          .to.have.property('onAddServerClick')
          .that.is.a('function')
      })

      it('should dispatch an action', function() {
        res.onAddServerClick()
        expect(fakeDispatch).to.have.been.called
      })
    })
    describe('onAddChannelClick', function() {
      it('is a function', function() {
        expect(res)
          .to.have.property('onAddChannelClick')
          .that.is.a('function')
      })

      it('should dispatch an action', function() {
        res.onAddChannelClick(conn1GUID)
        expect(fakeDispatch).to.have.been.called
      })
    })
    describe('onSettingsClick', function() {
      it('is a function', function() {
        expect(res)
          .to.have.property('onSettingsClick')
          .that.is.a('function')
      })

      it('should dispatch an action', function() {
        res.onSettingsClick()
        expect(fakeDispatch).to.have.been.called
      })
    })
  })
})
