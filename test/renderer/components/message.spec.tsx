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
      let wrapper1 = mount(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text: 'hello',
              sender: 'boby'
            })
          }
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the sender and message as text', function() {
        expect(wrapper1).to.have.text('boby: hello')
      })
    })
    describe('emoji message', function() {
      let wrapper1 = mount(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text: ':sob::b::sob:b:sob::BB:',
              sender: 'boby'
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
      let wrapper1 = mount(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text:
                'take a look at this. http://somthing.somthing/something.jpg',
              sender: 'boby'
            })
          }
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the sender and message as text and an image tag', function() {
        expect(wrapper1).to.have.text(
          'boby: take a look at this. http://somthing.somthing/something.jpg'
        )
        expect(wrapper1.find('img')).to.exist
      })
    })
  })

  describe('has sender', function() {
    describe('normal message', function() {
      let wrapper1 = mount(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text: 'hello'
            })
          }
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the sender and message as text', function() {
        expect(wrapper1).to.have.text('hello')
      })
    })
    describe('emoji message', function() {
      let wrapper1 = mount(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text: ':sob::b::sob:b:sob::BB:'
            })
          }
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the message as text with emojis replaced in', function() {
        expect(wrapper1).to.have.text(
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
      let wrapper1 = mount(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text:
                'take a look at this. http://somthing.somthing/something.jpg'
            })
          }
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the message as text and an image tag', function() {
        expect(wrapper1).to.have.text(
          'take a look at this. http://somthing.somthing/something.jpg'
        )
        expect(wrapper1.find('img')).to.exist
      })
    })
  })
})
