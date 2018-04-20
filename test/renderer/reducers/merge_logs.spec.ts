import { expect, use } from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { List } from 'immutable'

import * as merge_logs from '../../../app/renderer/reducers/merge_logs'
import { ConnectionFactory } from '../../../app/renderer/models/connections'
import { ChannelFactory } from '../../../app/renderer/models/channel'
import { mergeLog, ActionTypeKeys } from '../../../app/renderer/actions'
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

describe('add-connection reducer', function() {
  let prevState = defaultStore
  let nextState: ElectricState
  const connid = Guid.create()
  const chanid = Guid.create()
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
                }),
                new MessageFactory({
                  sender: 'bobt',
                  type: MessageType.MESSAGE,
                  text: 'world',
                  sent: new Date(10)
                }),
                new MessageFactory({
                  sender: 'bob',
                  type: MessageType.MESSAGE,
                  text: 'world',
                  sent: new Date(11)
                }),
                new MessageFactory({
                  sender: 'boby',
                  type: MessageType.MESSAGE,
                  text: 'world',
                  sent: new Date(11)
                })
              ])
            })
          ])
        })
      ])
    )
  })

  describe('merging logs', function() {
    before(function() {
      nextState = merge_logs.default(
        prevState,
        mergeLog(connid, chanid, [
          {
            sender: 'bob',
            channel_name: 'hello',
            message: 'world',
            sent: '1970-01-01T00:00:00.010Z',
            command: 'PRIVMSG'
          },
          {
            sender: 'boba',
            channel_name: 'hello',
            message: 'world',
            sent: '1970-01-01T00:00:00.010Z',
            command: 'PRIVMSG'
          },
          {
            sender: 'bob',
            channel_name: 'hello',
            message: 'world',
            sent: '1971-01-01T00:00:00.010Z',
            command: 'PRIVMSG'
          },
          {
            sender: 'bob',
            channel_name: 'hello',
            message: 'world',
            sent: '1971-01-01T00:00:00.010Z',
            command: 'QUIT'
          },
          {
            sender: 'bob',
            channel_name: 'hello',
            message: 'world',
            sent: '1971-01-01T00:00:00.010Z',
            command: 'KICK'
          },
          {
            sender: 'bob',
            channel_name: 'hello',
            message: 'world',
            sent: '1971-01-01T00:00:00.010Z',
            command: 'PART'
          },
          {
            sender: 'bob',
            channel_name: 'hello',
            message: 'world',
            sent: '1971-01-01T00:00:00.010Z',
            command: 'KILL'
          },
          {
            sender: 'bob',
            channel_name: 'hello',
            message: 'world',
            sent: '1971-01-01T00:00:00.010Z',
            command: 'JOIN'
          },
          {
            sender: 'bob',
            channel_name: 'hello',
            message: 'world',
            sent: '1970-01-01T00:00:00.010Z',
            command: ''
          }
        ])
      )
    })

    it('has 2 more log', function() {
      expect(
        nextState.connections
          .get(0)
          .channels.get(0)
          .log.count()
      ).to.eq(12)
    })
  })
})
