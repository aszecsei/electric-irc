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
  MessageType,
  SettingsFactory
} from '../../../app/renderer/models'
import { Guid } from '../../../app/renderer/models/guid'
import * as dateFormat from 'dateformat'
import YouTube from 'react-youtube'

use(chaiEnzyme())
describe('message component', function() {
  describe('has sender', function() {
    describe('normal message', function() {
      SettingsFactory()
      const now = new Date()
      const wrapper1 = shallow(
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
          settings={SettingsFactory()}
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the sender and message as text', function() {
        expect(wrapper1).to.have.text(`boby: (today)${dateFormat(now,SettingsFactory().timeformat)}hello`)
      })
    })
    describe('emoji message', function() {
      const now = new Date(12)
      const wrapper1 = shallow(
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
          settings={SettingsFactory()}
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the sender and message as text with emojis replaced in', function() {
        expect(wrapper1).to.have.text(
          `boby: ${dateFormat(now,SettingsFactory().timeformat)}${Emojis[':sob:']}${Emojis[':b:']}${
            Emojis[':sob:']
          }b${Emojis[':sob:']}:BB:`
        )
      })
    })
    describe('image message', function() {
      const now = new Date(12)
      const wrapper1 = shallow(
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
          settings={SettingsFactory()}
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the sender and message as text and an image tag', function() {
        expect(wrapper1).to.have.text(
          `boby: ${dateFormat(now,SettingsFactory().timeformat)}take a look at this. http://somthing.somthing/something.jpg`
        )
        expect(wrapper1.find('img')).to.exist
      })
    })
  })

  describe('has no sender', function() {
    describe('normal message', function() {
      const now = new Date(12)
      const wrapper1 = shallow(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text: 'hello',
              sent: now
            })
          }
          settings={SettingsFactory()}
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the sender and message as text', function() {
        expect(wrapper1).to.have.text(dateFormat(now,SettingsFactory().timeformat) + 'hello')
      })
    })
    describe('emoji message', function() {
      const now = new Date(12)
      const wrapper1 = shallow(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text: ':sob::b::sob:b:sob::BB:',
              sent: now
            })
          }
          settings={SettingsFactory()}
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the message as text with emojis replaced in', function() {
        expect(wrapper1).to.have.text(
          `${dateFormat(now,SettingsFactory().timeformat)}${Emojis[':sob:']}${Emojis[':b:']}${
            Emojis[':sob:']
          }b${Emojis[':sob:']}:BB:`
        )
      })
    })
    describe('image message', function() {
      const now = new Date(12)
      const wrapper1 = shallow(
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
          settings={SettingsFactory()}
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the message as text and an image tag', function() {
        expect(wrapper1).to.have.text(
          dateFormat(now,SettingsFactory().timeformat) +
            'take a look at this. http://somthing.somthing/something.jpg'
        )
        expect(wrapper1.find('img')).to.exist
      })
    })
    describe('vid message type 1', function() {
      const now = new Date(12)
      const wrapper1 = shallow(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text:
                'take a look at this. https://youtu.be/Lg9EDyAR_0U',
              sent: now
            })
          }
          settings={SettingsFactory()}
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the message as text and an YouTube component', function() {
        expect(wrapper1).to.have.text(
          dateFormat(now,SettingsFactory().timeformat) +
            'take a look at this. https://youtu.be/Lg9EDyAR_0U<YouTube />'
        )
        expect(wrapper1.find(YouTube)).to.exist
      })
    })
    describe('vid message type 2', function() {
      const now = new Date(12)
      const wrapper1 = shallow(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text:
                'take a look at this. https://www.youtube.com/embed/Lg9EDyAR_0U',
              sent: now
            })
          }
          settings={SettingsFactory()}
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the message as text and a YouTube component', function() {
        expect(wrapper1).to.have.text(
          dateFormat(now,SettingsFactory().timeformat) +
            'take a look at this. https://www.youtube.com/embed/Lg9EDyAR_0U<YouTube />'
        )
        expect(wrapper1.find(YouTube)).to.exist
      })
    })
    describe('vid message type 3', function() {
      const now = new Date(12)
      const wrapper1 = shallow(
        <MessageDisp
          message={
            new MessageFactory({
              id: Guid.create(),
              type: MessageType.MESSAGE,
              text:
                'take a look at this. https://www.youtube.com/watch?v=Lg9EDyAR_0U',
              sent: now
            })
          }
          settings={SettingsFactory()}
        />
      )
      it('should exist', function() {
        expect(MessageDisp).to.exist
      })
      it('should have the message as text and a YouTube component', function() {
        expect(wrapper1).to.have.text(
          dateFormat(now,SettingsFactory().timeformat) +
            'take a look at this. https://www.youtube.com/watch?v=Lg9EDyAR_0U<YouTube />'
        )
        expect(wrapper1.find(YouTube)).to.exist
      })
    })
  })
})
