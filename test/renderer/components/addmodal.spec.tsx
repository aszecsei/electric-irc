import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'

import * as React from 'react'
import { mount, render, shallow, ReactWrapper } from 'enzyme'

import * as AddModal from '../../../app/renderer/components/addmodal'
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

describe('addmodal', function() {
  let wrapper: ReactWrapper = null
  let instance: AddModal.AddModal = null
  let onClick: sinon.SinonSpy = null
  let onSubmit: sinon.SinonSpy = null
  let inputName: any = null
  let value: string

  before(function() {
    onClick = sinon.spy()
    onSubmit = sinon.spy()
    wrapper = mount(
      <AddModal.AddModal
        visible={false}
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
        onAddServerToggle={onClick}
        onAddServerSubmit={onSubmit}
      />
    )
    instance = wrapper.instance() as AddModal.AddModal
  })
  it('should exist', function() {
    expect(AddModal.AddModal).to.exist
  })
  describe('handlename', function() {
    it('should change state of name if valid', function() {
      value = 'test'
      inputName = mount(
        <Input value={value} onChange={instance.handleChangeName} />
      )
      inputName.instance().value = 'test'
      inputName.simulate('change')
      expect(instance.state.nickname).to.eq('test')
    })
    it('should not change state if not valid', function() {
      value = 'sta'
      inputName = mount(
        <Input value={value} onChange={instance.handleChangeName} />
      )
      inputName.instance().value = 'st'
      inputName.simulate('change')
      expect(instance.state.nickname).to.eq('sta')
    })
  })
  describe('handleirc', function() {
    it('should change state of name if valid', function() {
      value = 'test'
      inputName = mount(
        <Input value={value} onChange={instance.handleChangeName} />
      )
      inputName.instance().value = 'test'
      inputName.simulate('change')
      expect(instance.state.nickname).to.eq('test')
    })
    it('should not change state if not valid', function() {
      value = 'st'
      inputName = mount(
        <Input value={value} onChange={instance.handleChangeName} />
      )
      inputName.instance().value = 'st'
      inputName.simulate('change')
      expect(instance.state.nickname).to.eq('st')
    })
  })
  describe('handle server name', function() {
    it('should change state of server name', function() {
      instance.handleChangeIRCName({ target: { value: 'beepboop' } })
      expect(instance.state.name).to.eq('beepboop')
    })
  })
  it('should handle submitting', function() {
    instance.handleSubmit({
      preventDefault: () => {}
    })
    expect(onSubmit).to.have.been.calledOnce
  })
})
