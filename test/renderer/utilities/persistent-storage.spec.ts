import { expect, use } from 'chai'

import * as sinon from 'sinon'
import * as chaiAsPromised from 'chai-as-promised'

import { List } from 'immutable'

import * as fileStorage from '../../../app/renderer/utilities/file-storage'
import { defaultStore } from '../../../app/renderer/reducers/reducers'

import {
  loadSettings,
  loadConnections,
  writeConnections
} from '../../../app/renderer/utilities/persistent-storage'
import {
  SettingsFactory,
  Connection,
  ConnectionFactory,
  Channel,
  ChannelFactory
} from '../../../app/renderer/models'
import { ElectricState } from '../../../app/renderer/store'
import { IAddServerAction, addServer } from '../../../app/renderer/actions'

use(chaiAsPromised)

const initialState = defaultStore

describe('load settings', function() {
  const sandbox = sinon.createSandbox()

  describe('with a non-existent file', function() {
    let callback
    beforeEach(function() {
      sandbox.stub(fileStorage, 'readFile').rejects()
      sandbox.stub(fileStorage, 'saveFile').resolves()
      callback = sinon.spy()
    })

    it('should write a file', function(done) {
      loadSettings(initialState, endState => {
        expect(fileStorage.saveFile).to.have.been.called
        done()
      })
    })

    it('should return the default state', function(done) {
      loadSettings(initialState, endState => {
        expect(endState).to.eq(initialState)
        done()
      })
    })

    afterEach(function() {
      sandbox.restore()
    })
  })

  describe('with an existing file', function() {
    const newLeaveMessage = 'im out'
    const newSettings = new SettingsFactory({ defleave: newLeaveMessage })
    const newTheme = 'solarized'

    let callback
    beforeEach(function() {
      sandbox
        .stub(fileStorage, 'readFile')
        .resolves({ settings: newSettings, theme: newTheme })
      sandbox.stub(fileStorage, 'saveFile').resolves()
      callback = sinon.spy()
    })

    it('should not write a file', function(done) {
      loadSettings(initialState, endState => {
        expect(fileStorage.saveFile).to.not.have.been.called
        done()
      })
    })

    it('should return a state with correct settings', function(done) {
      loadSettings(initialState, endState => {
        expect(endState.settings.defleave).to.eq(newLeaveMessage)
        done()
      })
    })

    it('should return a state with correct theme', function(done) {
      loadSettings(initialState, endState => {
        expect(endState.themeName).to.eq(newTheme)
        done()
      })
    })

    afterEach(function() {
      sandbox.restore()
    })
  })
})

describe('load connections', function() {
  const sandbox = sinon.createSandbox()

  describe('with a non-existent file', function() {
    let callback
    beforeEach(function() {
      sandbox.stub(fileStorage, 'readFile').rejects()
      sandbox.stub(fileStorage, 'saveFile').resolves()
      callback = sinon.spy()
    })

    it('should not do anything', function() {
      expect(loadConnections()).to.be.rejected
    })

    afterEach(function() {
      sandbox.restore()
    })
  })

  describe('with an existing file', function() {
    const serverName = 'Freenode'
    const serverURL = 'chat.freenode.net'
    const nickname = 'tester'
    const channels = ['#electric-irc', '#mychannel']
    const storedConnections = [
      {
        name: serverName,
        url: serverURL,
        nickname,
        channels
      }
    ]

    const expectedPayload = addServer(serverName, serverURL, nickname, channels)

    let callback
    beforeEach(function() {
      sandbox.stub(fileStorage, 'readFile').resolves(storedConnections)
      sandbox.stub(fileStorage, 'saveFile').resolves()
      callback = sinon.spy()
    })

    it('should return a list of actions', function() {
      expect(loadConnections()).to.eventually.equal(
        List<IAddServerAction>([expectedPayload])
      )
    })

    afterEach(function() {
      sandbox.restore()
    })
  })
})

describe('write connections', function() {
  const sandbox = sinon.createSandbox()

  const conn1Name = 'Freenode'
  const conn1URL = 'chat.freenode.net'
  const conn1Nick = 'test'

  const connection1 = new ConnectionFactory({
    name: conn1Name,
    url: conn1URL,
    nickname: conn1Nick,
    channels: List<Channel>([
      new ChannelFactory({
        name: '#electric-irc'
      }),
      new ChannelFactory({
        name: '#home'
      })
    ])
  })

  const currentState = initialState.set(
    'connections',
    List<Connection>([connection1])
  )

  let callback
  beforeEach(function() {
    sandbox.stub(fileStorage, 'readFile').rejects()
    sandbox.stub(fileStorage, 'saveFile').resolves()
    callback = sinon.spy()
  })

  it('should call saveFile', function() {
    writeConnections(currentState)
    expect(fileStorage.saveFile).to.have.been.calledWith(
      'savedconnections.ei',
      [
        {
          name: conn1Name,
          url: conn1URL,
          nickname: conn1Nick,
          channels: ['#electric-irc', '#home']
        }
      ]
    )
  })

  afterEach(function() {
    sandbox.restore()
  })
})
