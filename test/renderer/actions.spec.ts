import { expect, use } from 'chai'
import { List } from 'immutable'

import * as Actions from '../../app/renderer/actions'
import { MessageFactory } from '../../app/renderer/models/message'
import { Guid, ChannelFactory } from '../../app/renderer/models'

describe('actions', function() {
  describe('removeServer', function() {
    let result: Actions.IRemoveServerAction
    let guid = Guid.create()
    before(function() {
      result = Actions.removeServer(guid)
    })

    it('should create an action with type REMOVE_SERVER', function() {
      expect(result.type).to.eq(Actions.ActionTypeKeys.REMOVE_SERVER)
    })

    it('should include a payload of the server ID', function() {
      expect(result.id).to.eq(guid)
    })
  })

  describe('editServer', function() {
    let result: Actions.IEditServerAction
    const newName = 'New Name'
    const newURL = 'New URL'
    let guid = Guid.create()
    before(function() {
      result = Actions.editServer(guid, newName, newURL)
    })

    it('should create an action with type EDIT_SERVER', function() {
      expect(result.type).to.eq(Actions.ActionTypeKeys.EDIT_SERVER)
    })

    it('should include a payload of the server ID', function() {
      expect(result.id).to.eq(guid)
    })

    it('should include a payload of the new server name', function() {
      expect(result.name).to.eq(newName)
    })

    it('should include a payload of the server URL', function() {
      expect(result.url).to.eq(newURL)
    })
  })

  describe('addChannel', function() {
    let result: Actions.IAddChannelAction
    const serverId = Guid.create()
    const channelName = '#channel'
    const channel = new ChannelFactory({
      name: channelName
    })

    before(function() {
      result = Actions.addChannel(serverId, channel)
    })

    it('should include a payload of the server ID', function() {
      expect(result.serverId).to.eq(serverId)
    })

    it('should include a payload of the name of the channel to join', function() {
      expect(result.channel).to.eq(channel)
    })
  })

  describe('appendLog', function() {
    let result: Actions.IAppendLogAction
    const serverId = Guid.create()
    const channelId = Guid.create()
    const msg = new MessageFactory({ text: 'Hello, world!' })

    before(function() {
      result = Actions.appendLog(serverId, channelId, msg)
    })

    it('should include a payload of the server ID', function() {
      expect(result.serverId).to.eq(serverId)
    })

    it('should include a payload of the channel ID', function() {
      expect(result.channelId).to.eq(channelId)
    })

    it('should include a payload of the message to append', function() {
      expect(result.message).to.eq(msg)
    })
  })

  describe('sendMessage', function() {
    let result: Actions.ISendMessageAction
    const serverId = Guid.create()
    const channelId = Guid.create()
    const msg = 'Hello, world!'

    before(function() {
      result = Actions.sendMessage(serverId, channelId, msg)
    })

    it('should include a payload of the server ID', function() {
      expect(result.serverId).to.eq(serverId)
    })

    it('should include a payload of the channel ID', function() {
      expect(result.channelId).to.eq(channelId)
    })

    it('should include a payload of the message to send', function() {
      expect(result.message).to.eq(msg)
    })
  })
})
