import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'

import * as React from 'react'
import { mount, render, shallow, ReactWrapper } from 'enzyme'

import { MessageDisp } from '../../../app/renderer/components/message'
import * as sinon from 'sinon'
import Input from 'reactstrap/lib/Input'
import { Emojis } from '../../../app/renderer/emojis/index'
import {
  Message,
  MessageFactory,
  MessageType
} from '../../../app/renderer/models/message'
import { Guid } from '../../../app/renderer/models/guid'

use(chaiEnzyme())
describe('message component', function() {
  describe('has sender', function() {
    describe('normal message', function() {
      let now = new Date()
      let wrapper1 = mount(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text: 'hello',
              sender: 'boby',
              sent: now
            })
          }
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the sender and message as text', function() {
        expect(wrapper1).to.have.text('boby: ' + now.toLocaleString() + 'hello')
      })
    })
    describe('emoji message', function() {
      let now = new Date()
      let wrapper1 = mount(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text: ':sob::b::sob:b:sob::BB:',
              sender: 'boby',
              sent: now
            })
          }
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the sender and message as text with emojis replaced in', function() {
        expect(wrapper1).to.have.text(
          'boby: ' +
            now.toLocaleString() +
            Emojis[':sob:'] +
            Emojis[':b:'] +
            Emojis[':sob:'] +
            'b' +
            Emojis[':sob:'] +
            ':BB:'
        )
      })
    })
    describe('image message', function() {
      let now = new Date()
      let wrapper1 = mount(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text:
                'take a look at this. http://somthing.somthing/something.jpg',
              sender: 'boby',
              sent: now
            })
          }
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the sender and message as text and an image tag', function() {
        expect(wrapper1).to.have.text(
          'boby: ' +
            now.toLocaleString() +
            'take a look at this. http://somthing.somthing/something.jpg'
        )
        expect(wrapper1.find('img')).to.exist
      })
    })
  })

  describe('has no sender', function() {
    describe('normal message', function() {
      let now = new Date()
      let wrapper1 = mount(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text: 'hello',
              sent: now
            })
          }
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the sender and message as text', function() {
        expect(wrapper1).to.have.text(now.toLocaleString() + 'hello')
      })
    })
    describe('emoji message', function() {
      let now = new Date()
      let wrapper1 = mount(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text: ':sob::b::sob:b:sob::BB:',
              sent: now
            })
          }
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the message as text with emojis replaced in', function() {
        expect(wrapper1).to.have.text(
          now.toLocaleString() +
            Emojis[':sob:'] +
            Emojis[':b:'] +
            Emojis[':sob:'] +
            'b' +
            Emojis[':sob:'] +
            ':BB:'
        )
      })
    })
    describe('image message', function() {
      let now = new Date()
      let wrapper1 = mount(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text:
                'take a look at this. http://somthing.somthing/something.jpg',
              sent: now
            })
          }
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the message as text and an image tag', function() {
        expect(wrapper1).to.have.text(
          now.toLocaleString() +
            'take a look at this. http://somthing.somthing/something.jpg'
        )
        expect(wrapper1.find('img')).to.exist
      })
    })
  })
})
