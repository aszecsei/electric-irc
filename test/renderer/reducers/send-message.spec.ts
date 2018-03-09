import { expect, use } from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { List } from 'immutable'

import sendMessageReducer, {
  _replace
} from '../../../app/renderer/reducers/send-message'
import { defaultStore } from '../../../app/renderer/reducers/reducers'
import { ConnectionFactory } from '../../../app/renderer/models/connections'
import { ChannelFactory } from '../../../app/renderer/models/channel'
import { ElectricState } from '../../../app/renderer/store'
import { MessageFactory } from '../../../app/renderer/models/message'
import { sendMessage } from '../../../app/renderer/actions'

describe('replace', function() {
  const list = List(['a', 'ab', 'abc', 'abcd', 'abc'])
  const newItem = '1234'
  let result: List<String>

  describe('one element', function() {
    const originalItem = 'abcd'

    before(function() {
      result = _replace(list, originalItem, newItem)
    })

    it('should remove the original item from the list', function() {
      expect(result.includes(originalItem)).to.be.false
    })

    it('should add the new item to the list', function() {
      expect(result.includes(newItem)).to.be.true
    })
  })

  describe('multiple elements', function() {
    const originalItem = 'abc'

    before(function() {
      result = _replace(list, originalItem, newItem)
    })

    it('should remove the original item from the list', function() {
      expect(result.includes(originalItem)).to.be.false
    })

    it('should add the new item to the list', function() {
      expect(result.includes(newItem)).to.be.true
    })

    it('should have the same number of the original item and the new item', function() {
      expect(
        list.count(value => {
          return value == originalItem
        })
      ).to.eq(
        result.count(value => {
          return value == newItem
        })
      )
    })
  })

  describe('no element', function() {
    const originalItem = 'ABCDEFG'

    before(function() {
      result = _replace(list, originalItem, newItem)
    })

    it('should not add the new item to the list', function() {
      expect(result.includes(newItem)).to.be.false
    })

    it('should not alter the list', function() {
      expect(result.toArray()).to.deep.eq(list.toArray())
    })
  })
})

describe('send message reducer', function() {
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
  const message = new MessageFactory({ text: 'Hello, world!' })
  let result: ElectricState

  describe('with valid connection and channel', function() {
    before(function() {
      result = sendMessageReducer(originalState, sendMessage(1, 2, message))
    })

    it('should add the message to the log', function() {
      expect(
        result.connections
          .get(0)
          .channels.get(1)
          .log.contains(message)
      ).to.be.true
    })

    it('should not change any other channel', function() {
      expect(result.connections.get(0).channels.get(0).log).to.deep.eq(
        originalState.connections.get(0).channels.get(0).log
      )
    })
  })

  describe('with invalid connection', function() {
    before(function() {
      result = sendMessageReducer(originalState, sendMessage(100, 2, message))
    })

    it('should not change the state', function() {
      expect(result).to.eq(originalState)
    })
  })

  describe('with invalid channel', function() {
    before(function() {
      result = sendMessageReducer(originalState, sendMessage(1, 200, message))
    })

    it('should not change the state', function() {
      expect(result).to.eq(originalState)
    })
  })
})
