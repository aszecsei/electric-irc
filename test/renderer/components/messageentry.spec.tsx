import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'

import * as React from 'react'
import { mount, render, shallow, ReactWrapper } from 'enzyme'
import {
  Connection,
  ConnectionFactory
} from '../../../app/renderer/models/connections'
import { Channel, ChannelFactory } from '../../../app/renderer/models/channel'

import { List } from 'immutable'
import { Message, MessageFactory } from '../../../app/renderer/models/message'
import { MessageEntry } from '../../../app/renderer/components/messageentry'
import { Guid } from '../../../app/renderer/models/guid'
import * as sinon from 'sinon'
import { Picker, EmojiData, emojiIndex } from 'emoji-mart'

use(chaiEnzyme())

const createFakeEvent = (value: string) => {
  return {
    target: {
      value,
      classList: {
        add: val => undefined,
        remove: val => undefined
      }
    },
    preventDefault: () => undefined
  }
}

describe('message entry component', function() {
  const onSendMessage = sinon.spy()
  const wrapper = shallow(
    <MessageEntry
      connection={
        new ConnectionFactory({
          id: Guid.create(),
          name: 'Connection 1',
          channels: List([
            new ChannelFactory({ id: Guid.create(), name: '#channel1' }),
            new ChannelFactory({ id: Guid.create(), name: '#channel2' })
          ])
        })
      }
      channel={new ChannelFactory({ id: Guid.create(), name: '#channel2' })}
      onSendMessage={onSendMessage}
    />
  )
  const instance = wrapper.instance() as MessageEntry

  it('should exist', function() {
    expect(MessageEntry).to.exist
  })
  it('when text is entered update local state', function() {
    const inputCheck = shallow(
      <input value={'hihi'} onChange={instance.handleChange} />
    )
    inputCheck.simulate('change', createFakeEvent('hihihi'))
    expect(instance.state.value).to.be.equal('hihihi')
  })
  it('when text is submited call onSendMessage and update local state', function() {
    const inputCheck = shallow(
      <input
        value={'hihi'}
        onChange={instance.handleChange}
        onSubmit={instance.handleSubmit}
      />
    )
    inputCheck.simulate('change', createFakeEvent('hihihi'))
    inputCheck.simulate('submit', createFakeEvent(''))
    expect(instance.props.onSendMessage).to.have.been.called
    expect(instance.state.value).to.be.equal('')
  })
  it('when emoji picker toggle pressed it should flip bool emoji_vis', function() {
    instance.setState({ value: 'hihi', emoji_vis: false })
    const inputCheck = shallow(
      <a type={'button'} onClick={instance.toggle_emoji} />
    )
    inputCheck.simulate('click', createFakeEvent(''))
    expect(instance.state.emoji_vis).to.be.equal(true)
    expect(instance.state.value).to.be.equal('hihi')
    inputCheck.simulate('click', createFakeEvent(''))
    expect(instance.state.emoji_vis).to.be.equal(false)
    expect(instance.state.value).to.be.equal('hihi')
  })
  it('when emoji is picked it should add to value state', function() {
    // had trouble getting the simulat click to work on Picker, I think it's not actually a real click event so simulate click wont work
    // so I just called the function directly
    instance.setState({ value: 'hihi', emoji_vis: true })
    // const inputCheck = shallow(
    //   <Picker
    //     onClick={instance.pick_emoji}
    //     custom={[]}
    //   />
    // )
    const thumbUp = emojiIndex.emojis['+1']
    // inputCheck.simulate('click', thumbUp)
    instance.pick_emoji(thumbUp)
    expect(instance.state.emoji_vis).to.be.equal(true)
    expect(instance.state.value).to.be.equal('hihi' + thumbUp.native)
  })
  it('when textbox is clicked closes emoji picker if open', function() {
    instance.setState({ value: 'hihi', emoji_vis: true })
    const inputCheck = shallow(
      <input value={'hihi'} onClick={instance.close_emoji} />
    )
    inputCheck.simulate('click', createFakeEvent(''))
    expect(instance.state.emoji_vis).to.be.equal(false)
    expect(instance.state.value).to.be.equal('hihi')
  })
  it('when not viewing channel textbox and submit button is disabled', function() {
    const wrapper2 = shallow(<MessageEntry onSendMessage={onSendMessage} />)
    const instance2 = wrapper2.instance() as MessageEntry
    const box = instance2.disabledBox()
    const sub = instance2.disabledSubmit()
    expect(box.props.disabled).to.be.equal(true)
    expect(sub.props.disabled).to.be.equal(true)
  })
})
