import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'

import * as React from 'react'
import { mount, render, shallow, ReactWrapper } from 'enzyme'

import * as AddChannelModal from '../../../app/renderer/components/addchannelmodal'
import {
  Connection,
  ConnectionFactory
} from '../../../app/renderer/models/connections'
import { Channel, ChannelFactory } from '../../../app/renderer/models/channel'
import { List } from 'immutable'
import { Guid } from '../../../app/renderer/models/guid'
import * as sinon from 'sinon'
import Input from 'reactstrap/lib/Input'

use(chaiEnzyme())

describe('addchannelmodal', function() {
  let wrapper: ReactWrapper = null
  let instance: AddChannelModal.AddChannelModal = null
  let onClick: sinon.SinonSpy = null
  let onSubmit: sinon.SinonSpy = null
  let inputChannel: any = null
  let value: string
  let conn: Guid
  before(function() {
    onClick = sinon.spy()
    onSubmit = sinon.spy()
    conn = Guid.create()
    wrapper = mount(
      <AddChannelModal.AddChannelModal
        connID={conn}
        connections={List<Connection>([
          new ConnectionFactory({
            id: Guid.create(),
            name: 'Connection 1',
            url: 'xxx',
            channels: List([
              new ChannelFactory({ id: Guid.create(), name: '#channel1' }),
              new ChannelFactory({ id: Guid.create(), name: '#channel2' })
            ])
          })
        ])}
        onAddChannelToggle={onClick}
        onAddChannelSubmit={onSubmit}
      />
    )
    instance = wrapper.instance() as AddChannelModal.AddChannelModal
  })
  it('should exist', function() {
    expect(AddChannelModal.AddChannelModal).to.exist
  })
  describe('handlechange', function() {
    it('should change state if valid', function() {
      value = '#testing'
      inputChannel = mount(
        <Input
          value={value}
          onChange={instance.generateHandleChangeChannel()}
        />
      )
      inputChannel.instance().value = '#testing'
      inputChannel.simulate('change')
      expect(instance.state.channel).to.eq('#testing')
    })
    it('should change state if invalid', function() {
      value = 'testing'
      inputChannel = mount(
        <Input
          value={value}
          onChange={instance.generateHandleChangeChannel()}
        />
      )
      inputChannel.instance().value = 'testing'
      inputChannel.simulate('change')
      expect(instance.state.channel).to.eq('testing')
    })
    // it('should handle submitting', function() {
    //   instance.handleSubmit({
    //     preventDefault: () => null
    //   })
    //   expect(onSubmit).to.have.been.calledOnce
    // })
  })
})
