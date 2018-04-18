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
describe('message parsers', function() {
  describe('parseMessage', function() {
    const message = parseMessage('hel', 'wor', 'hello world')

    it('has the correct message text', function() {
      expect(message.text).to.eq('hello world')
    })

    it('has have the correct sender', function() {
      expect(message.sender).to.eq('hel')
    })

    it('has the correct message type', function() {
      expect(message.type).to.eq(MessageType.MESSAGE)
    })
  })
  describe('parseNickChange', function() {
    const message = parseNickChange('hel', 'wor', ['hello', 'world'])

    it('has the correct message text', function() {
      expect(message.text).to.be.equal('hel is now known as wor.')
    })

    it('has the correct message type', function() {
      expect(message.type).to.be.equal(MessageType.NICKCHANGE)
    })
  })

  describe('parseKillMessage', function() {
    describe('with a reason', function() {
      const message = parseKillMessage('hel', 'bye bye')

      it('has the correct message text', function() {
        expect(message.text).to.be.equal('hel has been KILLED (bye bye)')
      })

      it('has the correct message type', function() {
        expect(message.type).to.be.equal(MessageType.KILL)
      })
    })

    describe('without a reason', function() {
      const message = parseKillMessage('hel')

      it('has the correct message text', function() {
        expect(message.text).to.be.equal('hel has been KILLED')
      })

      it('has the correct message type', function() {
        expect(message.type).to.be.equal(MessageType.KILL)
      })
    })
  })

  describe('parseQuitMessage', function() {
    describe('with a reason', function() {
      const message = parseQuitMessage('hel', 'bye bye')

      it('has the correct message text', function() {
        expect(message.text).to.be.equal('hel has QUIT (bye bye)')
      })

      it('has the correct message type', function() {
        expect(message.type).to.be.equal(MessageType.QUIT)
      })
    })

    describe('without a reason', function() {
      const message = parseQuitMessage('hel')

      it('has the correct message text', function() {
        expect(message.text).to.be.equal('hel has QUIT')
      })

      it('has the correct message type', function() {
        expect(message.type).to.be.equal(MessageType.QUIT)
      })
    })
  })

  describe('parseJoinMessage', function() {
    const message = parseJoinMessage('hel', '#wor')

    it('has the correct message text', function() {
      expect(message.text).to.be.equal('hel has JOINED #wor')
    })

    it('has the correct message type', function() {
      expect(message.type).to.be.equal(MessageType.JOIN)
    })
  })

  describe('parseKickMessage', function() {
    describe('with a reason', function() {
      const message = parseKickMessage('hel', 'wor', '#earth', 'bye bye')

      it('has the correct message text', function() {
        expect(message.text).to.be.equal(
          'wor has KICKED hel from #earth for "bye bye"'
        )
      })

      it('has the correct message type', function() {
        expect(message.type).to.be.equal(MessageType.KICK)
      })
    })

    describe('without a reason', function() {
      const message = parseKickMessage('hel', 'wor', '#earth')

      it('has the correct message text', function() {
        expect(message.text).to.be.equal('wor has KICKED hel from #earth')
      })

      it('has the correct message type', function() {
        expect(message.type).to.be.equal(MessageType.KICK)
      })
    })
  })
  describe('parsePartMessage', function() {
    describe('with a reason', function() {
      const message = parsePartMessage('hel', '#earth', 'bye bye')

      it('has the correct message text', function() {
        expect(message.text).to.be.equal('hel has PARTED from #earth (bye bye)')
      })

      it('has the correct message type', function() {
        expect(message.type).to.be.equal(MessageType.PART)
      })
    })

    describe('without a reason', function() {
      const message = parsePartMessage('hel', '#earth')

      it('has the correct message text', function() {
        expect(message.text).to.be.equal('hel has PARTED from #earth')
      })

      it('has the correct message type', function() {
        expect(message.type).to.be.equal(MessageType.PART)
      })
    })
  })

  describe('parseNoticeMessage', function() {
    const fakemessage: IRC.IMessage = {
      command: 'NOTICE',
      rawCommand: 'NOTICE',
      commandType: null,
      args: ['arg1', 'arg2', 'arg3']
    }
    const message = parseNoticeMessage('hel', 'wor', fakemessage)

    it('has the correct message text', function() {
      expect(message.text).to.eq('arg2')
    })

    it('has have the correct sender', function() {
      expect(message.sender).to.eq('(hel) NOTICE to wor')
    })

    it('has the correct message type', function() {
      expect(message.type).to.eq(MessageType.NOTICE)
    })
  })
  describe('parseNumericMessage', function() {
    describe('with args', function() {
      const fakemessage: IRC.IMessage = {
        command: 'something',
        rawCommand: '333',
        commandType: null,
        args: ['arg1', 'arg2', 'arg3']
      }
      const message = parseNumericMessage('hel.wor.net', fakemessage)

      it('has the correct message text', function() {
        expect(message.text).to.be.equal('something(333): [arg1, arg2, arg3]')
      })

      it('has the correct sender', function() {
        expect(message.sender).to.be.equal('hel.wor.net')
      })

      it('has the correct message type', function() {
        expect(message.type).to.be.equal(MessageType.SERVER)
      })
    })

    describe('without args', function() {
      const fakemessage: IRC.IMessage = {
        command: 'something',
        rawCommand: '333',
        commandType: null,
        args: []
      }
      const message = parseNumericMessage('hel.wor.net', fakemessage)

      it('has the correct message text', function() {
        expect(message.text).to.be.equal('something(333)')
      })

      it('has the correct sender', function() {
        expect(message.sender).to.be.equal('hel.wor.net')
      })

      it('has the correct message type', function() {
        expect(message.type).to.be.equal(MessageType.SERVER)
      })
    })
  })
})
