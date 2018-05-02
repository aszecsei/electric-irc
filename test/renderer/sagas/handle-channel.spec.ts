import { expect, use } from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

import { fork, take } from 'redux-saga/effects'
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

function LimitedMockAddLisener(args: any) {
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
function callcallback(callback) {
  callback()
}
describe('subscribe', function() {
  sinon.stub(sagas, 'eventChannel').callsFake(callcallback)
  describe('raw listener', function() {
    describe('channel as first in args', function() {
      it('it call append log', function() {
        const mockC = mockClient({
          nick: 'bobby',
          addListener: LimitedMockAddLisener({
            cmd: 'raw',
            message: { args: ['#world'] }
          })
        })
        const fakeAction = {
          type: actions.ActionTypeKeys.APPEND_LOG,
          serverId: Guid.create(),
          channelId: Guid.create(),
          message: new MessageFactory()
        }
        const stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
        subscribeToRaw(
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
        const mockC = mockClient({
          nick: 'bobby',
          addListener: LimitedMockAddLisener({
            cmd: 'raw',
            message: { args: ['world'] }
          })
        })
        const fakeAction = {
          type: actions.ActionTypeKeys.APPEND_LOG,
          serverId: Guid.create(),
          channelId: Guid.create(),
          message: new MessageFactory()
        }
        const stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
        subscribeToRaw(
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
        const mockC = mockClient({
          nick: 'bobby',
          addListener: LimitedMockAddLisener({
            cmd: 'raw',
            message: { nick: 'bobby', args: ['#world'] }
          })
        })
        const fakeAction = {
          type: actions.ActionTypeKeys.APPEND_LOG,
          serverId: Guid.create(),
          channelId: Guid.create(),
          message: new MessageFactory()
        }
        const stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
        subscribeToRaw(
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
        const mockC = mockClient({
          nick: 'bobby',
          addListener: LimitedMockAddLisener({
            cmd: 'raw',
            message: { server: 'bobby', args: ['#world'] }
          })
        })
        const fakeAction = {
          type: actions.ActionTypeKeys.APPEND_LOG,
          serverId: Guid.create(),
          channelId: Guid.create(),
          message: new MessageFactory()
        }
        const stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
        subscribeToRaw(
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
      const mockC = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddLisener({
          cmd: 'nick',
          channels: ['#world', '#another'],
          oldnick: 'boby',
          newnick: 'bobby',
          message: {}
        })
      })
      const fakeAction = {
        type: actions.ActionTypeKeys.APPEND_LOG,
        serverId: Guid.create(),
        channelId: Guid.create(),
        message: new MessageFactory()
      }
      const stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
      subscribeToNick(
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
      const mockC = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddLisener({
          cmd: 'message#',
          to: '#world',
          nick: 'bobby',
          text: 'hi',
          message: {}
        })
      })
      const fakeAction = {
        type: actions.ActionTypeKeys.APPEND_LOG,
        serverId: Guid.create(),
        channelId: Guid.create(),
        message: new MessageFactory()
      }
      const stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
      subscribeToChannelMessage(
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
        const mockC = mockClient({
          nick: 'bobby',
          addListener: LimitedMockAddLisener({
            cmd: 'notice',
            to: '#world',
            nick: null,
            text: 'hi',
            message: { args: ['', ''], server: 'bob' }
          })
        })
        const fakeAction = {
          type: actions.ActionTypeKeys.APPEND_LOG,
          serverId: Guid.create(),
          channelId: Guid.create(),
          message: new MessageFactory()
        }
        const stub = sinon.stub(actions, 'appendLog').returns(fakeAction)

        subscribeToNotice(
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
        const mockC = mockClient({
          nick: 'bobby',
          addListener: LimitedMockAddLisener({
            cmd: 'notice',
            to: '#world',
            nick: 'bobby',
            text: 'hi',
            message: { args: ['', ''] }
          })
        })
        const fakeAction = {
          type: actions.ActionTypeKeys.APPEND_LOG,
          serverId: Guid.create(),
          channelId: Guid.create(),
          message: new MessageFactory()
        }
        const stub = sinon.stub(actions, 'appendLog').returns(fakeAction)

        subscribeToNotice(
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
    describe('I joined', function() {
      it('it calls joinChannel', function() {
        const mockC = mockClient({
          nick: 'bobby',
          addListener: LimitedMockAddLisener({
            cmd: 'join',
            ichannel: '#world',
            nick: 'bobby',
            message: {}
          })
        })
        const fakeAction = {
          type: actions.ActionTypeKeys.JOIN_CHANNEL,
          serverId: Guid.create(),
          channelName: '#world2'
        }
        const stub = sinon.stub(actions, 'joinChannel').returns(fakeAction)
        subscribeToJoin(
          mockC,
          new ConnectionFactory(),
          new ChannelFactory({
            name: '#'
          })
        )
        expect(actions.joinChannel).to.be.called
        stub.restore()
      })
    })
    describe('someone else joined', function() {
      it('it calls appendLog', function() {
        const mockC = mockClient({
          nick: 'bobby',
          addListener: LimitedMockAddLisener({
            cmd: 'join',
            ichannel: '#world',
            nick: 'bobby',
            message: {}
          })
        })
        const fakeAction = {
          type: actions.ActionTypeKeys.JOIN_CHANNEL,
          serverId: Guid.create(),
          channelName: '#world2'
        }
        const stub = sinon.stub(actions, 'appendLog').returns(fakeAction)
        subscribeToJoin(
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

  describe('quit listener', function() {
    it('it calls appendLog', function() {
      const mockC = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddLisener({
          cmd: 'quit',
          channels: ['#world', '#another'],
          nick: 'bobby',
          reason: 'I felt like it',
          message: {}
        })
      })
      const fakeAction = {
        type: actions.ActionTypeKeys.APPEND_LOG,
        serverId: Guid.create(),
        channelId: Guid.create(),
        message: new MessageFactory()
      }
      const stub = sinon.stub(actions, 'appendLog').returns(fakeAction)

      subscribeToQuit(
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
      const mockC = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddLisener({
          cmd: 'kill',
          channels: ['#world', '#another'],
          nick: 'bobby',
          reason: 'I felt like it',
          message: {}
        })
      })
      const fakeAction = {
        type: actions.ActionTypeKeys.APPEND_LOG,
        serverId: Guid.create(),
        channelId: Guid.create(),
        message: new MessageFactory()
      }
      const stub = sinon.stub(actions, 'appendLog').returns(fakeAction)

      subscribeToKill(
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
      const mockC = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddLisener({
          cmd: 'part',
          ichannel: '#world',
          nick: 'bobby',
          reason: 'I felt like it',
          message: {}
        })
      })
      const fakeAction = {
        type: actions.ActionTypeKeys.APPEND_LOG,
        serverId: Guid.create(),
        channelId: Guid.create(),
        message: new MessageFactory()
      }
      const stub = sinon.stub(actions, 'appendLog').returns(fakeAction)

      subscribeToPart(
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
      const mockC = mockClient({
        nick: 'bobby',
        addListener: LimitedMockAddLisener({
          cmd: 'kick',
          ichannel: '#world',
          nick: 'bobby',
          by: 'bob',
          reason: 'I felt like it',
          message: {}
        })
      })
      const fakeAction = {
        type: actions.ActionTypeKeys.APPEND_LOG,
        serverId: Guid.create(),
        channelId: Guid.create(),
        message: new MessageFactory()
      }
      const stub = sinon.stub(actions, 'appendLog').returns(fakeAction)

      subscribeToKick(
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
describe('requestServer', function() {
  it('it should make request to server', function() {
    const chanid = Guid.create()
    const connid = Guid.create()
    const chan = new ChannelFactory({
      id: chanid,
      name: '#world'
    })
    const conn = new ConnectionFactory({
      id: connid,
      channels: List<Channel>([chan])
    })
    const fakeAction = {
      type: actions.ActionTypeKeys.MERGE_LOGS,
      serverId: connid,
      channelId: chanid,
      json: null
    }
    const stubx = sinon.stub(XMLHttpRequest.prototype, 'send')
    const stubp = sinon
      .stub(JSON, 'parse')
      .returns({ status: 203, message: '' })
    const stubm = sinon.stub(actions, 'mergeLog').returns(fakeAction)
    const x = requestServer(conn, chan)
    expect(XMLHttpRequest.prototype.send).to.be.calledTwice
    // expect(actions.mergeLog).to.be.called
    stubm.restore()
    stubp.restore()
    stubx.restore()
  })
  // I tried, but making async made it too hard to get cov inside callback
  // it('it should merge logs', function() {
  //   const chanid = Guid.create()
  //   const connid = Guid.create()
  //   const chan = new ChannelFactory({
  //     id: chanid,
  //     name: '#world'
  //   })
  //   const conn = new ConnectionFactory({
  //     id: connid,
  //     nick: 'bob',
  //     channels: [chan]
  //   })
  //   const fakeAction = {
  //     type: actions.ActionTypeKeys.MERGE_LOGS,
  //     serverId: connid,
  //     channelId: chanid,
  //     json: null
  //   }
  //   // I tried
  //   const stubx = sinon.stub(XMLHttpRequest.prototype, 'send').callsFake(()=>{XMLHttpRequest.prototype.onreadystatechange()})
  //   const stuby = sinon.stub(XMLHttpRequest.prototype, 'onreadystatechange').callsFake(callcallback)
  //   const stubz = sinon.stub(XMLHttpRequest.prototype, 'status').callsFake(200)
  //   const stuba = sinon.stub(XMLHttpRequest.prototype, 'readyState').callsFake(4)
  //   const stubb = sinon.stub(XMLHttpRequest.prototype, 'responseText').callsFake("{\"status\":203,\"message\":\"d\"}")
  //   const stubp = sinon
  //     .stub(JSON, 'parse')
  //     .returns({ status: 203, message: '' })
  //   const stubm = sinon.stub(actions, 'mergeLog').returns(fakeAction)
  //   const x = requestServer(conn, chan)
  //   // x.next()
  //   // expect(XMLHttpRequest.prototype.send).to.be.calledTwice
  //   expect(actions.mergeLog).to.be.called
  //   stubm.restore()
  //   stubp.restore()
  //   stubx.restore()
  //   stuby.restore()
  //   stubz.restore()
  //   stuba.restore()
  //   stubb.restore()
  // })
})
describe('write', function() {
  describe('/nick', function() {
    it('it should call send on client', function() {
      const mockC = mockClient({
        nick: 'bobby',
        send: (...args: any[]) => null,
        say: (...args: any[]) => null
      })
      const conn = new ConnectionFactory({ id: Guid.create() })
      const chan = new ChannelFactory({ id: Guid.create(), name: '#world' })
      const pay: actions.ISendMessageAction = {
        type: actions.ActionTypeKeys.SEND_MESSAGE,
        serverId: conn.id,
        channelId: chan.id,
        message: '/nick bob'
      }
      const stub = sinon.stub(mockC, 'send')
      const x = insideWrite(mockC, conn, chan, pay)
      x.next()
      expect(mockC.send).to.be.called
      stub.restore()
    })
  })
  describe('/join', function() {
    it('it should call joinChannel', function() {
      const mockC = mockClient({
        nick: 'bobby',
        send: (...args: any[]) => {
          return
        },
        say: (...args: any[]) => {
          return
        },
        join: (...args: any[]) => {
          return
        }
      })
      const conn = new ConnectionFactory({ id: Guid.create() })
      const chan = new ChannelFactory({ id: Guid.create(), name: '#world' })
      const pay: actions.ISendMessageAction = {
        type: actions.ActionTypeKeys.SEND_MESSAGE,
        serverId: conn.id,
        channelId: chan.id,
        message: '/join #bob'
      }
      const stub = sinon.stub(mockC, 'join')
      const x = insideWrite(mockC, conn, chan, pay)
      x.next()
      expect(mockC.join).to.be.called
      stub.restore()
    })
  })
  describe('/somthing', function() {
    it('it should call send on client', function() {
      const mockC = mockClient({
        nick: 'bobby',
        send: (...args: any[]) => null,
        say: (...args: any[]) => null
      })
      const conn = new ConnectionFactory({ id: Guid.create() })
      const chan = new ChannelFactory({ id: Guid.create(), name: '#world' })
      const pay: actions.ISendMessageAction = {
        type: actions.ActionTypeKeys.SEND_MESSAGE,
        serverId: conn.id,
        channelId: chan.id,
        message: '/somthing bob df dsf fg'
      }
      const stub = sinon.stub(mockC, 'send')
      const x = insideWrite(mockC, conn, chan, pay)
      x.next()
      expect(mockC.send).to.be.called
      stub.restore()
    })
  })
  describe('normal message', function() {
    it('it should call send on client', function() {
      const mockC = mockClient({
        nick: 'bobby',
        send: (...args: any[]) => null,
        say: (...args: any[]) => null
      })
      const conn = new ConnectionFactory({ id: Guid.create() })
      const chan = new ChannelFactory({ id: Guid.create(), name: '#world' })
      const pay: actions.ISendMessageAction = {
        type: actions.ActionTypeKeys.SEND_MESSAGE,
        serverId: conn.id,
        channelId: chan.id,
        message: 'bob df dsf fg'
      }
      const stubm = sinon.stub(mockC, 'say')
      const fakeAction = {
        type: actions.ActionTypeKeys.APPEND_LOG,
        serverId: Guid.create(),
        channelId: Guid.create(),
        message: new MessageFactory()
      }
      const stuba = sinon.stub(actions, 'appendLog').returns(fakeAction)
      const x = insideWrite(mockC, conn, chan, pay)
      x.next()
      expect(mockC.say).to.be.called
      // expect(actions.appendLog).to.be.called
      stuba.restore()
      stubm.restore()
    })
    it('it should append log', function() {
      const mockC = mockClient({
        nick: 'bobby',
        send: (...args: any[]) => null,
        say: (...args: any[]) => null
      })
      const conn = new ConnectionFactory({ id: Guid.create() })
      const chan = new ChannelFactory({ id: Guid.create(), name: '#world' })
      const pay: actions.ISendMessageAction = {
        type: actions.ActionTypeKeys.SEND_MESSAGE,
        serverId: conn.id,
        channelId: chan.id,
        message: 'bob df dsf fg'
      }
      const stubm = sinon.stub(mockC, 'say')
      const fakeAction = {
        type: actions.ActionTypeKeys.APPEND_LOG,
        serverId: Guid.create(),
        channelId: Guid.create(),
        message: new MessageFactory()
      }
      const stuba = sinon.stub(actions, 'appendLog').returns(fakeAction)
      const x = insideWrite(mockC, conn, chan, pay)
      x.next()
      // expect(mockC.say).to.be.called
      expect(actions.appendLog).to.be.called
      stuba.restore()
      stubm.restore()
    })
  })
})
