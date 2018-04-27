import { expect, use } from 'chai'
import * as sinon from 'sinon'

import { defaultStore } from '../../../app/renderer/reducers/reducers'

import {
  mapStateToProps,
  mapDispatchToProps
} from '../../../app/renderer/containers/settings-modal-container'
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
describe('settings-model-container', function() {
  describe('map state to props', function() {
    const currentState = initialState

    it('return obj with the appropriote values from state', function() {
      const res = mapStateToProps(currentState)
      expect(res.visible).to.be.false
      expect(res.toggleTab).to.be.equal('1')
      expect(res.settings).to.be.equal(currentState.settings)
      expect(res.currentTheme).to.be.equal(currentState.themeName)
    })
  })

  describe('map dispatch to props', function() {
    const fakeDispatch = sinon.spy()
    const res = mapDispatchToProps(fakeDispatch)

    describe('onSettingsToggle', function() {
      it('is a function', function() {
        expect(res)
          .to.have.property('onSettingsToggle')
          .that.is.a('function')
      })

      it('should dispatch an action', function() {
        res.onSettingsToggle()
        expect(fakeDispatch).to.have.been.called
      })
    })
    describe('onTabToggle', function() {
      it('is a function', function() {
        expect(res)
          .to.have.property('onTabToggle')
          .that.is.a('function')
      })

      it('should dispatch an action', function() {
        res.onTabToggle('haha')
        expect(fakeDispatch).to.have.been.called
      })
    })
    describe('changeSetting', function() {
      it('is a function', function() {
        expect(res)
          .to.have.property('changeSetting')
          .that.is.a('function')
      })

      it('should dispatch an action', function() {
        res.changeSetting('scrollback', '')
        expect(fakeDispatch).to.have.been.called
      })
    })
    describe('changeTheme', function() {
      it('is a function', function() {
        expect(res)
          .to.have.property('changeTheme')
          .that.is.a('function')
      })

      it('should dispatch an action', function() {
        res.changeTheme('sometheme')
        expect(fakeDispatch).to.have.been.called
      })
    })
  })
})
