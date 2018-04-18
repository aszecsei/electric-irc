import {
  MessageType,
  parseMessage,
  parseNickChange,
  parseNumericMessage,
  parseNoticeMessage,
  parseJoinMessage,
  parseQuitMessage,
  parsePartMessage,
  parseKickMessage,
  parseKillMessage
} from '../../../app/renderer/models/message'
import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'

import * as React from 'react'
import { mount, render, shallow, ReactWrapper } from 'enzyme'

import * as IRC from 'irc'
import { CommandType } from 'irc'
describe('message parsers', function() {
  describe('parseMessage', function() {
    it('should create the apropriate formated message', function() {
      let message = parseMessage('hel', 'wor', 'hello world')
      expect(message.text).to.be.equal('hello world')
      expect(message.sender).to.be.equal('hel')
      expect(message.type).to.be.equal(MessageType.MESSAGE)
    })
  })
  describe('parseNickChange', function() {
    it('should create the apropriate formated message', function() {
      let message = parseNickChange('hel', 'wor', ['hello', 'world'])
      expect(message.text).to.be.equal('hel is now known as wor.')
      expect(message.type).to.be.equal(MessageType.NICKCHANGE)
    })
  })
  describe('parseKillMessage', function() {
    it('should create the apropriate formated message', function() {
      let message = parseKillMessage('hel', 'bye bye')
      let message2 = parseKillMessage('hel')
      expect(message.text).to.be.equal('hel has been KILLED (bye bye)!')
      expect(message2.text).to.be.equal('hel has been KILLED!')
      expect(message.type).to.be.equal(MessageType.KILL)
      expect(message2.type).to.be.equal(MessageType.KILL)
    })
  })
  describe('parseQuitMessage', function() {
    it('should create the apropriate formated message', function() {
      let message = parseQuitMessage('hel', 'bye bye')
      let message2 = parseQuitMessage('hel')
      expect(message.text).to.be.equal('hel has QUIT (bye bye)!')
      expect(message2.text).to.be.equal('hel has QUIT!')
      expect(message.type).to.be.equal(MessageType.QUIT)
      expect(message2.type).to.be.equal(MessageType.QUIT)
    })
  })
  describe('parseJoinMessage', function() {
    it('should create the apropriate formated message', function() {
      let message = parseJoinMessage('hel', '#wor')
      expect(message.text).to.be.equal('hel has JOINED #wor.')
      expect(message.type).to.be.equal(MessageType.JOIN)
    })
  })
  describe('parseKickMessage', function() {
    it('should create the apropriate formated message', function() {
      let message = parseKickMessage('hel', 'wor', '#earth', 'bye bye')
      let message2 = parseKickMessage('hel', 'wor', '#earth')
      expect(message.text).to.be.equal(
        'wor has KICKED hel from #earth for "bye bye"!'
      )
      expect(message2.text).to.be.equal('wor has KICKED hel from #earth!')
      expect(message.type).to.be.equal(MessageType.KICK)
      expect(message2.type).to.be.equal(MessageType.KICK)
    })
  })
  describe('parsePartMessage', function() {
    it('should create the apropriate formated message', function() {
      let message = parsePartMessage('hel', '#earth', 'bye bye')
      let message2 = parsePartMessage('hel', '#earth')
      expect(message.text).to.be.equal('hel has PARTED from #earth (bye bye)!')
      expect(message2.text).to.be.equal('hel has PARTED from #earth!')
      expect(message.type).to.be.equal(MessageType.PART)
      expect(message2.type).to.be.equal(MessageType.PART)
    })
  })
  describe('parseNoticeMessage', function() {
    it('should create the apropriate formated message', function() {
      const fakemessage: IRC.IMessage = {
        command: 'NOTICE',
        rawCommand: 'NOTICE',
        commandType: null,
        args: ['arg1', 'arg2', 'arg3']
      }
      let message = parseNoticeMessage('hel', 'wor', fakemessage)
      expect(message.sender).to.be.equal('(hel) NOTICE to wor')
      expect(message.text).to.be.equal('arg2')
      expect(message.type).to.be.equal(MessageType.NOTICE)
    })
  })
  describe('parseNumericMessage', function() {
    it('should create the apropriate formated message', function() {
      const fakemessage: IRC.IMessage = {
        command: 'something',
        rawCommand: '333',
        commandType: null,
        args: ['arg1', 'arg2', 'arg3']
      }
      const fakemessage2: IRC.IMessage = {
        command: 'something',
        rawCommand: '333',
        commandType: null,
        args: []
      }
      let message = parseNumericMessage('hel.wor.net', fakemessage)
      let message2 = parseNumericMessage('hel.wor.net', fakemessage2)
      expect(message.text).to.be.equal('something(333): [arg1, arg2, arg3]')
      expect(message.sender).to.be.equal('hel.wor.net')
      expect(message.type).to.be.equal(MessageType.SERVER)
      expect(message2.text).to.be.equal('something(333)')
      expect(message2.sender).to.be.equal('hel.wor.net')
      expect(message2.type).to.be.equal(MessageType.SERVER)
    })
  })
})
