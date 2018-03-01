import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'

import * as React from 'react'
import { mount, render, shallow, ReactWrapper } from 'enzyme'

import * as AddModal from '../../../app/renderer/components/addmodal'
import * as sinon from 'sinon'

use(chaiEnzyme())

describe('addmodal', function() {
  let wrapper: ReactWrapper = null
  let instance: AddModal.AddModal = null
  let onClick: sinon.SinonSpy = null

  before(function() {
    onClick = sinon.spy()
    wrapper = mount(<AddModal.AddModal />)
    instance = wrapper.instance() as AddModal.AddModal
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
      instance.handleChangeName({ target: { value: 'test' } })
      expect(instance.state.name).to.be('test')
    })
    it('should not change state if not valid', function() {
      instance.handleChangeName({ target: { value: 'st' } })
      expect(instance.state.name).to.be('st')
    })
  })
  describe('handleirc', function() {
    it('should change state of irc if valid', function() {
      instance.handleChangeIRC({ target: { value: 'test.net' } })
      expect(instance.state.irc).to.be('test.net')
    })
  })
})
