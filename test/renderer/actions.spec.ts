import { expect, use } from 'chai'
import { List } from 'immutable'

import * as Actions from '../../app/renderer/actions'
import { Message } from '../../app/renderer/models/message'

describe('actions', function() {
  describe('removeServer', function() {
    let result: Actions.IRemoveServerAction
    before(function() {
      result = Actions.removeServer(12)
    })

    it('should create an action with type REMOVE_SERVER', function() {
      expect(result.type).to.eq(Actions.ActionTypeKeys.REMOVE_SERVER)
    })

    it('should include a payload of the server ID', function() {
      expect(result.id).to.eq(12)
    })
  })

  describe('editServer', function() {
    let result: Actions.IEditServerAction
    const newName = 'New Name'
    const newURL = 'New URL'
    before(function() {
      result = Actions.editServer(15, newName, newURL)
    })

    it('should create an action with type EDIT_SERVER', function() {
      expect(result.type).to.eq(Actions.ActionTypeKeys.EDIT_SERVER)
    })

    it('should include a payload of the server ID', function() {
      expect(result.id).to.eq(15)
    })

    it('should include a payload of the new server name', function() {
      expect(result.name).to.eq(newName)
    })

    it('should include a payload of the server URL', function() {
      expect(result.url).to.eq(newURL)
    })
  })

  describe('joinChannel', function() {
    let result: Actions.IJoinChannelAction
    const serverId = 155
    const channelName = '#channel'

    before(function() {
      result = Actions.joinChannel(serverId, channelName)
    })

    it('should include a payload of the server ID', function() {
      expect(result.serverId).to.eq(serverId)
    })

    it('should include a payload of the name of the channel to join', function() {
      expect(result.channel).to.eq(channelName)
    })
  })

  describe('appendLog', function() {
    let result: Actions.IAppendLogAction
    const serverId = 122
    const channelId = 12
    const msg = new Message('Hello, world!')

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
    const serverId = 122
    const channelId = 12
    const msg = new Message('Hello, world!')

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
