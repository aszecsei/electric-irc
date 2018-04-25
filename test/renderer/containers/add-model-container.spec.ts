import { expect, use } from 'chai'
import * as sinon from 'sinon'

import { defaultStore } from '../../../app/renderer/reducers/reducers'

import {
  mapStateToProps,
  mapDispatchToProps
} from '../../../app/renderer/containers/add-modal-container'
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
describe('add-model-container', function() {
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

    it('return obj with states bool for add modal visibility and connections', function() {
      const res = mapStateToProps(currentState)
      expect(res.visible).to.be.false
      expect(res.connections).to.be.equal(connections)
    })
  })

  describe('map dispatch to props', function() {
    const fakeDispatch = sinon.spy()
    const res = mapDispatchToProps(fakeDispatch)

    describe('onAddServerToggle', function() {
      it('is a function', function() {
        expect(res)
          .to.have.property('onAddServerToggle')
          .that.is.a('function')
      })

      it('should dispatch an action', function() {
        res.onAddServerToggle()
        expect(fakeDispatch).to.have.been.called
      })
    })
    describe('onAddServerSubmit', function() {
      it('is a function', function() {
        expect(res)
          .to.have.property('onAddServerSubmit')
          .that.is.a('function')
      })

      it('should dispatch an action', function() {
        res.onAddServerSubmit('haha', 'haha.net', 'bob', ['#world'])
        expect(fakeDispatch).to.have.been.called
      })
    })
  })
})
