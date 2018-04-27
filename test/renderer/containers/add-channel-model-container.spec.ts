import { expect, use } from 'chai'
import * as sinon from 'sinon'

import { defaultStore } from '../../../app/renderer/reducers/reducers'

import {
  mapStateToProps,
  mapDispatchToProps
} from '../../../app/renderer/containers/add-channel-modal-container'
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
describe('add-channel-model-container', function() {
  describe('map state to props', function() {
    it('return obj with apropriate attributes from state', function() {
      const res = mapStateToProps(currentState)
      expect(res.connID).to.be.equal(undefined)
      expect(res.connections).to.be.equal(connections)
    })
  })

  describe('map dispatch to props', function() {
    const fakeDispatch = sinon.spy()
    const res = mapDispatchToProps(fakeDispatch)

    describe('onAddChannelToggle', function() {
      it('is a function', function() {
        expect(res)
          .to.have.property('onAddChannelToggle')
          .that.is.a('function')
      })

      it('should dispatch an action', function() {
        res.onAddChannelToggle()
        expect(fakeDispatch).to.have.been.called
      })
    })
    describe('onAddChannelSubmit', function() {
      it('is a function', function() {
        expect(res)
          .to.have.property('onAddChannelSubmit')
          .that.is.a('function')
      })

      it('should dispatch an action', function() {
        res.onAddChannelSubmit(conn1GUID, '#world')
        expect(fakeDispatch).to.have.been.called
      })
    })
  })
})
