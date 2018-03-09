import { expect, use } from 'chai'
import { List } from 'immutable'

import toggleAddServerModalReducer from '../../../app/renderer/reducers/toggle-add-server-modal'
import { toggleAddServerModal } from '../../../app/renderer/actions'
import { ElectricState } from '../../../app/renderer/store'
import { defaultStore } from '../../../app/renderer/reducers/reducers'

describe('toggle add server modal reducer', function() {
  const prevState = defaultStore
  let nextState: ElectricState = undefined
  let nextNextState: ElectricState = undefined

  describe('setting modal to invisible', function() {
    before(function() {
      nextState = toggleAddServerModalReducer(
        prevState,
        toggleAddServerModal(false)
      )
      nextNextState = toggleAddServerModalReducer(
        nextState,
        toggleAddServerModal(false)
      )
    })

    it('should set the modal to invisible', function() {
      expect(nextState.addServerModalActive).to.be.false
    })

    it('should continue setting the modal to invisible', function() {
      expect(nextNextState.addServerModalActive).to.be.false
    })
  })

  describe('setting modal to visible', function() {
    before(function() {
      nextState = toggleAddServerModalReducer(
        prevState,
        toggleAddServerModal(true)
      )
      nextNextState = toggleAddServerModalReducer(
        nextState,
        toggleAddServerModal(true)
      )
    })

    it('should set the modal to visible', function() {
      expect(nextState.addServerModalActive).to.be.true
    })

    it('should continue setting the modal to visible', function() {
      expect(nextNextState.addServerModalActive).to.be.true
    })
  })

  describe('toggling a modal back and forth', function() {
    before(function() {
      nextState = toggleAddServerModalReducer(prevState, toggleAddServerModal())
      nextNextState = toggleAddServerModalReducer(
        nextState,
        toggleAddServerModal()
      )
    })

    it('should toggle the modal visibility', function() {
      expect(nextState.addServerModalActive).to.not.eq(
        nextNextState.addServerModalActive
      )
    })
  })
})
