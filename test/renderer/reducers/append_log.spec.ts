import { expect, use } from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { List } from 'immutable'

import * as rappendLog from '../../../app/renderer/reducers/append-log'
import { ConnectionFactory } from '../../../app/renderer/models/connections'
import { ChannelFactory } from '../../../app/renderer/models/channel'
import { appendLog, ActionTypeKeys } from '../../../app/renderer/actions'
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
              name: '#channel1',
              log: List<Message>([
                new MessageFactory({
                  sender: 'bobz',
                  type: MessageType.MESSAGE,
                  text: 'world',
                  sent: new Date(9)
                })
              ])
            })
          ])
        })
      ])
    )
  })
  describe('adding a channel', function() {
    before(function() {
      nextState = rappendLog.default(
        prevState,
        appendLog(connid, chanid, new MessageFactory())
      )
    })
    it('has one more channel', function() {
      expect(
        nextState.connections
          .get(0)
          .channels.get(0)
          .log.count()
      ).to.eq(2)
    })
  })
})
