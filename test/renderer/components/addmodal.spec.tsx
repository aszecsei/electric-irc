import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'

import * as React from 'react'
import { mount, render, shallow, ReactWrapper } from 'enzyme'

import * as AddModal from '../../../app/renderer/components/addmodal'
import * as sinon from 'sinon'
import Input from 'reactstrap/lib/Input'

use(chaiEnzyme())

describe('addmodal', function() {
  let wrapper: ReactWrapper = null
  let instance: AddModal.AddModal = null
  let onClick: sinon.SinonSpy = null
  let inputName: any = null

  before(function() {
    onClick = sinon.spy()
    wrapper = mount(<AddModal.AddModal />)
    instance = wrapper.instance() as AddModal.AddModal
    inputName = wrapper.find('#Nickname')
  })
  it('should exist', function() {
    expect(AddModal.AddModal).to.exist
  })
  describe('toggle', function() {
    it('should initialize to be closed', function() {
      expect(instance.state.modal).to.be.true
    })
    it('should be expanded', function() {
      instance.toggle()
      expect(instance.state.modal).to.be.false
    })
  })
  describe('handlename', function() {
    it('should change state of name if valid', function() {
      inputName.simulate('change', { target: { value: 'test' } })
      expect(instance.state.name).to.be.equal('test')
    })
    it('should not change state if not valid', function() {
      inputName.simulate('change', { target: { value: 'st' } })
      expect(instance.state.name).to.be.equal('st')
    })
  })
  describe('handleirc', function() {
    it('should change state of irc if valid', function() {
      instance.handleChangeIRC({ target: { value: 'test.net' } })
      expect(instance.state.irc).to.be.equal('test.net')
    })
  })
})
