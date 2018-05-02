import { expect, use } from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

import { fork, take, put } from 'redux-saga/effects'
import * as IRC from 'irc'
import { List } from 'immutable'

import * as actions from '../../../app/renderer/actions'
import {
  insideWrite,
  requestServer,
  subscribeToChannelMessage,
  subscribeToJoin,
  subscribeToKick,
  subscribeToKill,
  subscribeToNick,
  subscribeToNotice,
  subscribeToPart,
  subscribeToQuit,
  subscribeToRaw
} from '../../../app/renderer/sagas/handle-channel'
import * as sagas from 'redux-saga'
import {
  Connection,
  ConnectionFactory
} from '../../../app/renderer/models/connections'
import { Channel, ChannelFactory } from '../../../app/renderer/models/channel'
import { print } from 'util'
import { MessageFactory } from '../../../app/renderer/models'
import { Guid } from '../../../app/renderer/models/guid'

function LimitedMockAddListener(args: any) {
  switch (args.cmd) {
    case 'kick':
      return (argcmd: string, callback) => {
        if (argcmd === args.cmd) {
          callback(args.ichannel, args.nick, args.by, args.reason, args.message)
        }
      }
    case 'part':
      return (argcmd: string, callback) => {
        if (argcmd === args.cmd) {
          callback(args.ichannel, args.nick, args.reason, args.message)
        }
      }
    case 'kill':
      return (argcmd: string, callback) => {
        if (argcmd === args.cmd) {
          callback(args.nick, args.reason, args.channels, args.message)
        }
      }
    case 'quit':
      return (argcmd: string, callback) => {
        if (argcmd === args.cmd) {
          callback(args.nick, args.reason, args.channels, args.message)
        }
      }
    case 'raw':
      return (argcmd: string, callback) => {
        if (argcmd === args.cmd) {
          callback(args.message)
        }
      }
    case 'join':
      return (argcmd: string, callback) => {
        if (argcmd === args.cmd) {
          callback(args.ichannel, args.nick, args.message)
        }
      }
    case 'notice':
      return (argcmd: string, callback) => {
        if (argcmd === args.cmd) {
          callback(args.nick, args.to, args.text, args.message)
        }
      }
    case 'message#':
      return (argcmd: string, callback) => {
        if (argcmd === args.cmd) {
          callback(args.nick, args.to, args.text, args.message)
        }
      }
    case 'nick':
      return (argcmd: string, callback) => {
        if (argcmd === args.cmd) {
          callback(args.oldnick, args.newnick, args.channels, args.message)
        }
      }
  }
}

function mockClient(args: any): IRC.Client {
  return {
    channellist: 'channellist' in args ? args.channellist : null,
    chans: 'chans' in args ? args.chans : null,
    conn: 'conn' in args ? args.conn : null,
    hostMask: 'hostMask' in args ? args.hostMask : null,
    maxLineLength: 'maxLineLength' in args ? args.maxLineLength : null,
    motd: 'motd' in args ? args.motd : null,
    nick: 'nick' in args ? args.nick : 'bob',
    opt: 'opt' in args ? args.opt : null,
    supported: 'supported' in args ? args.supported : null,
    action: 'action' in args ? args.action : () => null,
    activateFloodProtection:
      'activateFloodProtection' in args
        ? args.activateFloodProtection
        : () => null,
    addListener: 'addListener' in args ? args.addListener : () => null,
    connect: 'connect' in args ? args.connect : () => null,
    ctcp: 'ctcp' in args ? args.ctcp : () => null,
    disconnect: 'disconnect' in args ? args.disconnect : () => null,
    emit: 'emit' in args ? args.emit : () => null,
    eventNames: 'eventNames' in args ? args.eventNames : () => null,
    getMaxListeners:
      'getMaxListeners' in args ? args.getMaxListeners : () => null,
    join: 'join' in args ? args.join : () => null,
    list: 'list' in args ? args.list : () => null,
    listenerCount: 'listenerCount' in args ? args.listenerCount : () => null,
    listeners: 'listeners' in args ? args.listeners : () => null,
    notice: 'notice' in args ? args.notice : () => null,
    on: 'on' in args ? args.on : () => null,
    once: 'once' in args ? args.once : () => null,
    part: 'part' in args ? args.part : () => null,
    prependListener:
      'prependListener' in args ? args.prependListener : () => null,
    prependOnceListener:
      'prependOnceListener' in args ? args.prependOnceListener : () => null,
    removeAllListeners:
      'removeAllListeners' in args ? args.removeAllListeners : () => null,
    removeListener: 'removeListener' in args ? args.removeListener : () => null,
    say: 'say' in args ? args.say : () => null,
    send: 'send' in args ? args.send : () => null,
    setMaxListeners:
      'setMaxListeners' in args ? args.setMaxListeners : () => null,
    whois: 'whois' in args ? args.whois : () => null
  }
}

const sandbox = sinon.createSandbox()
const connectionId = Guid.create()
const channelId = Guid.create()

const fakeAction = { type: 'Fake Action' }

describe('subscriptions', function() {
  let emitSpy
  let mockedClient
  let generator
  let value1
  let value2
  beforeEach(function() {
    emitSpy = sinon.spy()
    sandbox.stub(sagas, 'eventChannel').callsArgWith(0, emitSpy)
    sandbox.stub(actions, 'joinChannel').returns(fakeAction)
    sandbox.stub(actions, 'makeChannelConnected').returns(fakeAction)
    sandbox.stub(actions, 'appendLog').returns(fakeAction)
  })

  afterEach(function() {
    sandbox.restore()
  })

  describe('subscribe to raw', function() {
    beforeEach(function() {
      mockedClient = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddListener({
          cmd: 'raw',
          message: { args: ['#world'] }
        })
      })
      generator = subscribeToRaw(mockedClient, new ConnectionFactory({ id: connectionId }), new ChannelFactory({ id: channelId, name: '#world' }))
      value1 = generator.next().value
      value2 = generator.next(fakeAction).value
    })
    
    it('should call appendLog', function() {
      expect(actions.appendLog).to.have.been.calledOnce
    })

    it('should dispatch the action', function() {
      expect(value2).to.deep.equal(put(fakeAction))
    })
  })

  describe('subscribe to nick changes', function() {
    beforeEach(function() {
      mockedClient = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddListener({
          cmd: 'nick',
          channels: ['#world', '#another'],
          oldnick: 'nick1',
          newnick: 'nick2',
          message: {}
        })
      })
      generator = subscribeToNick(mockedClient, new ConnectionFactory({ id: connectionId }), new ChannelFactory({ id: channelId, name: '#world' }))
      value1 = generator.next().value
      value2 = generator.next(fakeAction).value
    })
  
    it('should call appendLog', function() {
      expect(actions.appendLog).to.have.been.calledOnce
    })
  
    it('should dispatch the action', function() {
      expect(value2).to.deep.equal(put(fakeAction))
    })
  })

  describe('subscribe to channel messages', function() {
    beforeEach(function() {
      mockedClient = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddListener({
          cmd: 'message#',
          to: '#world',
          nick: 'nick1',
          text: 'hi',
          message: {}
        })
      })
      generator = subscribeToChannelMessage(mockedClient, new ConnectionFactory({ id: connectionId }), new ChannelFactory({ id: channelId, name: '#world' }))
      value1 = generator.next().value
      value2 = generator.next(fakeAction).value
    })
  
    it('should call appendLog', function() {
      expect(actions.appendLog).to.have.been.calledOnce
    })
  
    it('should dispatch the action', function() {
      expect(value2).to.deep.equal(put(fakeAction))
    })
  })

  describe('subscribe to notices', function() {
    beforeEach(function() {
      mockedClient = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddListener({
          cmd: 'notice',
          to: '#world',
          nick: null,
          text: 'hi',
          message: { args: ['', ''], server: 'bob' }
        })
      })
      generator = subscribeToNotice(mockedClient, new ConnectionFactory({ id: connectionId }), new ChannelFactory({ id: channelId, name: '#world' }))
      value1 = generator.next().value
      value2 = generator.next(fakeAction).value
    })
  
    it('should call appendLog', function() {
      expect(actions.appendLog).to.have.been.calledOnce
    })
  
    it('should dispatch the action', function() {
      expect(value2).to.deep.equal(put(fakeAction))
    })
  })

  describe('subscribe to joins', function() {
    describe('when given a new channel', function() {
      beforeEach(function() {
        mockedClient = mockClient({
          nick: 'nick1',
          addListener: LimitedMockAddListener({
            cmd: 'join',
            ichannel: '#other',
            nick: 'nick1',
            message: {}
          })
        })
        const channel = new ChannelFactory({ id: channelId, name: '#' })
        generator = subscribeToJoin(mockedClient, new ConnectionFactory({ id: connectionId }), channel)
        generator.next()
        value1 = generator.next(fakeAction).value
        value2 = generator.next(undefined).value
      })
    
      it('should call joinChannel', function() {
        expect(actions.joinChannel).to.have.been.calledOnce
      })
    
      it('should dispatch the action', function() {
        expect(value2).to.deep.equal(put(fakeAction))
      })
    })
    describe('when given an existing channel', function() {
      beforeEach(function() {
        mockedClient = mockClient({
          nick: 'nick1',
          addListener: LimitedMockAddListener({
            cmd: 'join',
            ichannel: '#world',
            nick: 'nick1',
            message: {}
          })
        })
        generator = subscribeToJoin(mockedClient, new ConnectionFactory({ id: connectionId }), new ChannelFactory({ id: channelId, name: '#' }))
        generator.next()
        value1 = generator.next(fakeAction).value
        value2 = generator.next(new ChannelFactory({ name: '#world' })).value
      })
    
      it('should call makeChannelConnected', function() {
        expect(actions.makeChannelConnected).to.have.been.calledOnce
      })
    
      it('should dispatch the action', function() {
        expect(value2).to.deep.equal(put(fakeAction))
      })
    })
  })
})