import { expect, use } from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { List } from 'immutable'

import * as raddChannel from '../../../app/renderer/reducers/add-channel'
import { ConnectionFactory } from '../../../app/renderer/models/connections'
import { ChannelFactory } from '../../../app/renderer/models/channel'
import { addChannel, ActionTypeKeys } from '../../../app/renderer/actions'
import { ElectricState } from '../../../app/renderer/store'
import { defaultStore } from '../../../app/renderer/reducers/reducers'

import * as IRC from 'irc'

import { Guid } from '../../../app/renderer/models/guid'
import {
  MessageFactory,
  MessageType,
  Message
} from '../../../app/renderer/models'
use(sinonChai)

describe('add-channel reducer', function() {
  let prevState = defaultStore
  let nextState: ElectricState = undefined
  let connid = Guid.create()
  let chanid = Guid.create()
  before(function() {
    prevState = prevState.set(
      'connections',
      List([
        new ConnectionFactory({
          id: connid,
          name: 'Connection 1',
          channels: List([
            new ChannelFactory({
              id: chanid,
              name: '#channel1'
            })
          ])
        })
      ])
    )
  })
  describe('adding a channel', function() {
    before(function() {
      nextState = raddChannel.default(
        prevState,
        addChannel(
          connid,
          new ChannelFactory({ id: Guid.create(), name: '#channel2' })
        )
      )
    })
    it('has one more channel', function() {
      expect(nextState.connections.get(0).channels.count()).to.eq(2)
    })
  })
  describe('adding a channel to a non-existent server', function() {
    before(function() {
      nextState = raddChannel.default(
        prevState,
        addChannel(
          Guid.createEmpty(),
          new ChannelFactory({
            id: Guid.create(),
            name: '#channel2'
          })
        )
      )
    })

    it('should not modify the state', function() {
      expect(nextState).to.eq(prevState)
    })
  })
})
