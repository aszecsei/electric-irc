import { expect, use } from 'chai'
import { List } from 'immutable'

import toggleAddChannelModalReducer from '../../../app/renderer/reducers/toggle-add-channel-modal'
import { toggleAddChannelModal } from '../../../app/renderer/actions'
import { ElectricState } from '../../../app/renderer/store'
import { defaultStore } from '../../../app/renderer/reducers/reducers'
import { Guid } from '../../../app/renderer/models'

describe('toggle add channel modal reducer', function() {
  const prevState = defaultStore
  let nextState: ElectricState
  let nextNextState: ElectricState
  const connid = Guid.create()

  describe('setting modal to visible', function() {
    before(function() {
      nextState = toggleAddChannelModalReducer(
        prevState,
        toggleAddChannelModal(connid)
      )
      nextNextState = toggleAddChannelModalReducer(
        nextState,
        toggleAddChannelModal(connid)
      )
    })

    it('should set the modal to visible', function() {
      expect(nextState.addChannelConnId).to.equal(connid)
    })

    it('should continue setting the modal to visible', function() {
      expect(nextNextState.addChannelConnId).to.equal(connid)
    })
  })

  describe('toggling a modal back and forth', function() {
    before(function() {
      nextState = toggleAddChannelModalReducer(
        prevState,
        toggleAddChannelModal(connid)
      )
      nextNextState = toggleAddChannelModalReducer(
        nextState,
        toggleAddChannelModal(null)
      )
    })

    it('should toggle the modal visibility', function() {
      expect(nextState.addChannelConnId).to.not.eq(
        nextNextState.addChannelConnId
      )
    })
  })
})
