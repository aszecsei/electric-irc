import { expect, use } from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

import { fork, take } from 'redux-saga/effects'
import * as IRC from 'irc'

import * as actions from '../../../app/renderer/actions'
import {
  subscribe,
  insideWrite
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
//use(sinonChai)
// cmd:string,
// message?: IRC.IMessage,
// ichannel?: IRC.IChannel,
// nick?: string,
// by?: string,
// reason?: string,
// channels?: string[],
// to?: string,
// text?: string,
// oldnick?: string,
// newnick?: string
function LimitedMockAddLisener(args: any) {
  switch (args.cmd) {
    case 'kick':
      return (argcmd: string, callback) => {
        if (argcmd == args.cmd) {
          callback(args.ichannel, args.nick, args.by, args.reason, args.message)
        }
      }
    case 'part':
      return (argcmd: string, callback) => {
        if (argcmd == args.cmd) {
          callback(args.ichannel, args.nick, args.reason, args.message)
        }
      }
    case 'kill':
      return (argcmd: string, callback) => {
        if (argcmd == args.cmd) {
          callback(args.nick, args.reason, args.channels, args.message)
        }
      }
    case 'quit':
      return (argcmd: string, callback) => {
        if (argcmd == args.cmd) {
          callback(args.nick, args.reason, args.channels, args.message)
        }
      }
    case 'raw':
      return (argcmd: string, callback) => {
        if (argcmd == args.cmd) {
          callback(args.message)
        }
      }
    case 'join':
      return (argcmd: string, callback) => {
        if (argcmd == args.cmd) {
          callback(args.ichannel, args.nick, args.message)
        }
      }
    case 'notice':
      return (argcmd: string, callback) => {
        if (argcmd == args.cmd) {
          callback(args.nick, args.to, args.text, args.message)
        }
      }
    case 'message#':
      return (argcmd: string, callback) => {
        if (argcmd == args.cmd) {
          callback(args.nick, args.to, args.text, args.message)
        }
      }
    case 'nick':
      return (argcmd: string, callback) => {
        if (argcmd == args.cmd) {
          callback(args.oldnick, args.newnick, args.channels, args.message)
        }
      }
  }
}
function mockClient(args: object): IRC.Client {
  return {
    channellist: 'channellist' in args ? args['channellist'] : null,
    chans: 'chans' in args ? args['chans'] : null,
    conn: 'conn' in args ? args['conn'] : null,
    hostMask: 'hostMask' in args ? args['hostMask'] : null,
    maxLineLength: 'maxLineLength' in args ? args['maxLineLength'] : null,
    motd: 'motd' in args ? args['motd'] : null,
    nick: 'nick' in args ? args['nick'] : 'bob',
    opt: 'opt' in args ? args['opt'] : null,
    supported: 'supported' in args ? args['supported'] : null,
    action: 'action' in args ? args['action'] : () => {},
    activateFloodProtection:
      'activateFloodProtection' in args
        ? args['activateFloodProtection']
        : () => {},
    addListener: 'addListener' in args ? args['addListener'] : () => {},
    connect: 'connect' in args ? args['connect'] : () => {},
    ctcp: 'ctcp' in args ? args['ctcp'] : () => {},
    disconnect: 'disconnect' in args ? args['disconnect'] : () => {},
    emit: 'emit' in args ? args['emit'] : () => {},
    eventNames: 'eventNames' in args ? args['eventNames'] : () => {},
    getMaxListeners:
      'getMaxListeners' in args ? args['getMaxListeners'] : () => {},
    join: 'join' in args ? args['join'] : () => {},
    list: 'list' in args ? args['list'] : () => {},
    listenerCount: 'listenerCount' in args ? args['listenerCount'] : () => {},
    listeners: 'listeners' in args ? args['listeners'] : () => {},
    notice: 'notice' in args ? args['notice'] : () => {},
    on: 'on' in args ? args['on'] : () => {},
    once: 'once' in args ? args['once'] : () => {},
    part: 'part' in args ? args['part'] : () => {},
    prependListener:
      'prependListener' in args ? args['prependListener'] : () => {},
    prependOnceListener:
      'prependOnceListener' in args ? args['prependOnceListener'] : () => {},
    removeAllListeners:
      'removeAllListeners' in args ? args['removeAllListeners'] : () => {},
    removeListener:
      'removeListener' in args ? args['removeListener'] : () => {},
    say: 'say' in args ? args['say'] : () => {},
    send: 'send' in args ? args['send'] : () => {},
    setMaxListeners:
      'setMaxListeners' in args ? args['setMaxListeners'] : () => {},
    whois: 'whois' in args ? args['whois'] : () => {}
  }
}
function callcallback(callback) {
  callback()
}
describe('suscribe', function() {
  let xhttp = sinon.stub(XMLHttpRequest.prototype, 'send')
  sinon.stub(sagas, 'eventChannel').callsFake(callcallback)
  describe('raw listener', function() {
    describe('channel as first in args', function() {
      it('it call append log', function() {
        let mockC = mockClient({
          nick: 'bobby',
          addListener: LimitedMockAddLisener({
            cmd: 'raw',
            message: { args: ['#world'] } as IRC.IMessage
          })
        })
        const fakeAction = {
          type: actions.ActionTypeKeys.APPEND_LOG,
          serverId: Guid.create(),
          channelId: Guid.create(),
          message: new MessageFactory()
        } as actions.IAppendLogAction
        var stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
        subscribe(
          mockC,
          new ConnectionFactory(),
          new ChannelFactory({
            name: '#world'
          })
        )
        expect(actions.appendLog).to.be.called
        stub.restore()
      })
    })
    describe('channel not first in args', function() {
      it('it call append log', function() {
        let mockC = mockClient({
          nick: 'bobby',
          addListener: LimitedMockAddLisener({
            cmd: 'raw',
            message: { args: ['world'] } as IRC.IMessage
          })
        })
        const fakeAction = {
          type: actions.ActionTypeKeys.APPEND_LOG,
          serverId: Guid.create(),
          channelId: Guid.create(),
          message: new MessageFactory()
        } as actions.IAppendLogAction
        var stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
        subscribe(
          mockC,
          new ConnectionFactory(),
          new ChannelFactory({
            name: '#'
          })
        )
        expect(actions.appendLog).to.be.called
        stub.restore()
      })
    })
    describe('has nick', function() {
      it('it call append log', function() {
        let mockC = mockClient({
          nick: 'bobby',
          addListener: LimitedMockAddLisener({
            cmd: 'raw',
            message: { nick: 'bobby', args: ['#world'] } as IRC.IMessage
          })
        })
        const fakeAction = {
          type: actions.ActionTypeKeys.APPEND_LOG,
          serverId: Guid.create(),
          channelId: Guid.create(),
          message: new MessageFactory()
        } as actions.IAppendLogAction
        var stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
        subscribe(
          mockC,
          new ConnectionFactory(),
          new ChannelFactory({
            name: '#world'
          })
        )
        expect(actions.appendLog).to.be.called
        stub.restore()
      })
    })
    describe('has sever', function() {
      it('it call append log', function() {
        let mockC = mockClient({
          nick: 'bobby',
          addListener: LimitedMockAddLisener({
            cmd: 'raw',
            message: { server: 'bobby', args: ['#world'] } as IRC.IMessage
          })
        })
        const fakeAction = {
          type: actions.ActionTypeKeys.APPEND_LOG,
          serverId: Guid.create(),
          channelId: Guid.create(),
          message: new MessageFactory()
        } as actions.IAppendLogAction
        var stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
        subscribe(
          mockC,
          new ConnectionFactory(),
          new ChannelFactory({
            name: '#world'
          })
        )
        expect(actions.appendLog).to.be.called
        stub.restore()
      })
    })
  })
  describe('nick listener', function() {
    it('it calls appendLog', function() {
      let mockC = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddLisener({
          cmd: 'nick',
          channels: ['#world', '#another'],
          oldnick: 'boby',
          newnick: 'bobby',
          message: {} as IRC.IMessage
        })
      })
      const fakeAction = {
        type: actions.ActionTypeKeys.APPEND_LOG,
        serverId: Guid.create(),
        channelId: Guid.create(),
        message: new MessageFactory()
      } as actions.IAppendLogAction
      var stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
      //expect(sagas.eventChannel).to.be.called
      subscribe(
        mockC,
        new ConnectionFactory(),
        new ChannelFactory({
          name: '#world'
        })
      )
      expect(actions.appendLog).to.be.called
      stub.restore()
    })
  })
  describe('message# listener', function() {
    it('it calls appendLog', function() {
      let mockC = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddLisener({
          cmd: 'message#',
          to: '#world',
          nick: 'bobby',
          text: 'hi',
          message: {} as IRC.IMessage
        })
      })
      const fakeAction = {
        type: actions.ActionTypeKeys.APPEND_LOG,
        serverId: Guid.create(),
        channelId: Guid.create(),
        message: new MessageFactory()
      } as actions.IAppendLogAction
      var stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
      //expect(sagas.eventChannel).to.be.called
      subscribe(
        mockC,
        new ConnectionFactory(),
        new ChannelFactory({
          name: '#world'
        })
      )
      expect(actions.appendLog).to.be.called
      stub.restore()
    })
  })
  describe('notice listener', function() {
    describe('nick undefined', function() {
      it('it calls appendLog', function() {
        let mockC = mockClient({
          nick: 'bobby',
          addListener: LimitedMockAddLisener({
            cmd: 'notice',
            to: '#world',
            nick: null,
            text: 'hi',
            message: { args: ['', ''], server: 'bob' } as IRC.IMessage
          })
        })
        const fakeAction = {
          type: actions.ActionTypeKeys.APPEND_LOG,
          serverId: Guid.create(),
          channelId: Guid.create(),
          message: new MessageFactory()
        } as actions.IAppendLogAction
        var stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
        //expect(sagas.eventChannel).to.be.called
        subscribe(
          mockC,
          new ConnectionFactory(),
          new ChannelFactory({
            name: '#world'
          })
        )
        expect(actions.appendLog).to.be.called
        stub.restore()
      })
    })
    describe('nick defined', function() {
      it('it calls appendLog', function() {
        let mockC = mockClient({
          nick: 'bobby',
          addListener: LimitedMockAddLisener({
            cmd: 'notice',
            to: '#world',
            nick: 'bobby',
            text: 'hi',
            message: { args: ['', ''] } as IRC.IMessage
          })
        })
        const fakeAction = {
          type: actions.ActionTypeKeys.APPEND_LOG,
          serverId: Guid.create(),
          channelId: Guid.create(),
          message: new MessageFactory()
        } as actions.IAppendLogAction
        var stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
        //expect(sagas.eventChannel).to.be.called
        subscribe(
          mockC,
          new ConnectionFactory(),
          new ChannelFactory({
            name: '#world'
          })
        )
        expect(actions.appendLog).to.be.called
        stub.restore()
      })
    })
  })
  describe('join listener', function() {
    it('it calls appendLog', function() {
      let mockC = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddLisener({
          cmd: 'join',
          ichannel: '#world',
          nick: 'bobby',
          message: {} as IRC.IMessage
        })
      })
      const fakeAction = {
        type: actions.ActionTypeKeys.APPEND_LOG,
        serverId: Guid.create(),
        channelId: Guid.create(),
        message: new MessageFactory()
      } as actions.IAppendLogAction
      var stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
      //expect(sagas.eventChannel).to.be.called
      subscribe(
        mockC,
        new ConnectionFactory(),
        new ChannelFactory({
          name: '#world'
        })
      )
      expect(actions.appendLog).to.be.called
      expect(XMLHttpRequest.prototype.send).to.be.calledTwice
      xhttp.reset()
      stub.restore()
    })
  })
  describe('quit listener', function() {
    it('it calls appendLog', function() {
      let mockC = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddLisener({
          cmd: 'quit',
          channels: ['#world', '#another'],
          nick: 'bobby',
          reason: 'I felt like it',
          message: {} as IRC.IMessage
        })
      })
      const fakeAction = {
        type: actions.ActionTypeKeys.APPEND_LOG,
        serverId: Guid.create(),
        channelId: Guid.create(),
        message: new MessageFactory()
      } as actions.IAppendLogAction
      var stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
      //expect(sagas.eventChannel).to.be.called
      subscribe(
        mockC,
        new ConnectionFactory(),
        new ChannelFactory({
          name: '#world'
        })
      )
      expect(actions.appendLog).to.be.called
      stub.restore()
    })
  })
  describe('kill listener', function() {
    it('it calls appendLog', function() {
      let mockC = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddLisener({
          cmd: 'kill',
          channels: ['#world', '#another'],
          nick: 'bobby',
          reason: 'I felt like it',
          message: {} as IRC.IMessage
        })
      })
      const fakeAction = {
        type: actions.ActionTypeKeys.APPEND_LOG,
        serverId: Guid.create(),
        channelId: Guid.create(),
        message: new MessageFactory()
      } as actions.IAppendLogAction
      var stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
      //expect(sagas.eventChannel).to.be.called
      subscribe(
        mockC,
        new ConnectionFactory(),
        new ChannelFactory({
          name: '#world'
        })
      )
      expect(actions.appendLog).to.be.called
      stub.restore()
    })
  })
  describe('part listener', function() {
    it('it calls appendLog', function() {
      let mockC = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddLisener({
          cmd: 'part',
          ichannel: '#world',
          nick: 'bobby',
          reason: 'I felt like it',
          message: {} as IRC.IMessage
        })
      })
      const fakeAction = {
        type: actions.ActionTypeKeys.APPEND_LOG,
        serverId: Guid.create(),
        channelId: Guid.create(),
        message: new MessageFactory()
      } as actions.IAppendLogAction
      var stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
      //expect(sagas.eventChannel).to.be.called
      subscribe(
        mockC,
        new ConnectionFactory(),
        new ChannelFactory({
          name: '#world'
        })
      )
      expect(actions.appendLog).to.be.called
      stub.restore()
    })
  })
  describe('kick listener', function() {
    it('it calls appendLog', function() {
      let mockC = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddLisener({
          cmd: 'kick',
          ichannel: '#world',
          nick: 'bobby',
          by: 'bob',
          reason: 'I felt like it',
          message: {} as IRC.IMessage
        })
      })
      const fakeAction = {
        type: actions.ActionTypeKeys.APPEND_LOG,
        serverId: Guid.create(),
        channelId: Guid.create(),
        message: new MessageFactory()
      } as actions.IAppendLogAction
      var stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
      //expect(sagas.eventChannel).to.be.called
      subscribe(
        mockC,
        new ConnectionFactory(),
        new ChannelFactory({
          name: '#world'
        })
      )
      expect(actions.appendLog).to.be.called
      stub.restore()
    })
  })
})
describe('write', function() {
  describe('/nick', function() {
    it('it should call send on client', function() {
      let mockC = mockClient({
        nick: 'bobby',
        send: (...args: any[]) => {},
        say: (...args: any[]) => {}
      })
      const conn = new ConnectionFactory({ id: Guid.create() })
      const chan = new ChannelFactory({ id: Guid.create(), name: '#world' })
      const pay: actions.ISendMessageAction = {
        serverId: conn.id,
        channelId: chan.id,
        message: '/nick bob'
      } as actions.ISendMessageAction
      const stub = sinon.stub(mockC, 'send')
      const x = insideWrite(mockC, conn, chan, pay)
      x.next()
      expect(mockC.send).to.be.called
      stub.restore()
    })
  })
  describe('/join', function() {
    it('it should call joinChannel', function() {
      let mockC = mockClient({
        nick: 'bobby',
        send: (...args: any[]) => {},
        say: (...args: any[]) => {}
      })
      const conn = new ConnectionFactory({ id: Guid.create() })
      const chan = new ChannelFactory({ id: Guid.create(), name: '#world' })
      const pay: actions.ISendMessageAction = {
        serverId: conn.id,
        channelId: chan.id,
        message: '/join #bob'
      } as actions.ISendMessageAction
      const fakeAction = {
        type: actions.ActionTypeKeys.JOIN_CHANNEL,
        serverId: conn.id,
        channelId: chan.name
      } as actions.IJoinChannelAction
      var stub = sinon.stub(actions, 'joinChannel').returns(fakeAction)
      const x = insideWrite(mockC, conn, chan, pay)
      x.next()
      expect(actions.joinChannel).to.be.called
      stub.restore()
    })
  })
  describe('/somthing', function() {
    it('it should call send on client', function() {
      let mockC = mockClient({
        nick: 'bobby',
        send: (...args: any[]) => {},
        say: (...args: any[]) => {}
      })
      const conn = new ConnectionFactory({ id: Guid.create() })
      const chan = new ChannelFactory({ id: Guid.create(), name: '#world' })
      const pay: actions.ISendMessageAction = {
        serverId: conn.id,
        channelId: chan.id,
        message: '/somthing bob df dsf fg'
      } as actions.ISendMessageAction
      const stub = sinon.stub(mockC, 'send')
      const x = insideWrite(mockC, conn, chan, pay)
      x.next()
      expect(mockC.send).to.be.called
      stub.restore()
    })
  })
  describe('normal message', function() {
    it('it should call send on client', function() {
      let mockC = mockClient({
        nick: 'bobby',
        send: (...args: any[]) => {},
        say: (...args: any[]) => {}
      })
      const conn = new ConnectionFactory({ id: Guid.create() })
      const chan = new ChannelFactory({ id: Guid.create(), name: '#world' })
      const pay: actions.ISendMessageAction = {
        serverId: conn.id,
        channelId: chan.id,
        message: 'bob df dsf fg'
      } as actions.ISendMessageAction
      const stubm = sinon.stub(mockC, 'say')
      const fakeAction = {
        type: actions.ActionTypeKeys.APPEND_LOG,
        serverId: Guid.create(),
        channelId: Guid.create(),
        message: new MessageFactory()
      } as actions.IAppendLogAction
      var stuba = sinon.stub(actions, 'appendLog').returns(fakeAction)
      const x = insideWrite(mockC, conn, chan, pay)
      x.next()
      expect(mockC.say).to.be.called
      expect(actions.appendLog).to.be.called
      stuba.restore()
      stubm.restore()
    })
  })
})
