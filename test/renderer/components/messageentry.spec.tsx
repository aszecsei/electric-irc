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

use(chaiEnzyme())

describe('message entry component', function() {
  const onSendMessage = sinon.spy()
  const wrapper = mount(
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
    const inputCheck = mount(
      <input value={'hihi'} onChange={instance.handleChange} />
    )
    inputCheck.simulate('change')
    expect(instance.state.value).to.be.equal('hihi')
  })
  it('when text is submited call onSendMessage and update local state', function() {
    let inputCheck = mount(
      <input value={'hihi'} onChange={instance.handleChange} />
    )
    inputCheck.simulate('change')
    inputCheck = mount(
      <input value={'hihi'} onChange={instance.handleSubmit} />
    )
    inputCheck.simulate('change')
    expect(instance.props.onSendMessage).to.have.been.called
    expect(instance.state.value).to.be.equal('')
  })
})
