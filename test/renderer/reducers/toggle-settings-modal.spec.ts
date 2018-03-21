import { expect, use } from 'chai'
import { List } from 'immutable'

import toggleSettingsModalReducer from '../../../app/renderer/reducers/toggle-settings-modal'
import { toggleSettingsModal } from '../../../app/renderer/actions'
import { ElectricState } from '../../../app/renderer/store'
import { defaultStore } from '../../../app/renderer/reducers/reducers'

describe('toggle add server modal reducer', function() {
  const prevState = defaultStore
  let nextState: ElectricState = undefined
  let nextNextState: ElectricState = undefined

  describe('setting modal to invisible', function() {
    before(function() {
      nextState = toggleSettingsModalReducer(
        prevState,
        toggleSettingsModal(false)
      )
      nextNextState = toggleSettingsModalReducer(
        nextState,
        toggleSettingsModal(false)
      )
    })

    it('should set the modal to invisible', function() {
      expect(nextState.settingsModalActive).to.be.false
    })

    it('should continue setting the modal to invisible', function() {
      expect(nextNextState.settingsModalActive).to.be.false
    })
  })

  describe('setting modal to visible', function() {
    before(function() {
      nextState = toggleSettingsModalReducer(
        prevState,
        toggleSettingsModal(true)
      )
      nextNextState = toggleSettingsModalReducer(
        nextState,
        toggleSettingsModal(true)
      )
    })

    it('should set the modal to visible', function() {
      expect(nextState.settingsModalActive).to.be.true
    })

    it('should continue setting the modal to visible', function() {
      expect(nextNextState.settingsModalActive).to.be.true
    })
  })

  describe('toggling a modal back and forth', function() {
    before(function() {
      nextState = toggleSettingsModalReducer(prevState, toggleSettingsModal())
      nextNextState = toggleSettingsModalReducer(
        nextState,
        toggleSettingsModal()
      )
    })

    it('should toggle the modal visibility', function() {
      expect(nextState.settingsModalActive).to.not.eq(
        nextNextState.settingsModalActive
      )
    })
  })
})
