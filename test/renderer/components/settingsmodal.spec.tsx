import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'
import {
  TabContent,
  Nav,
  NavItem,
  NavLink,
  Modal,
  TabPane,
  Row,
  Col,
  Input
} from 'reactstrap'
import * as React from 'react'
import { mount, render, shallow, ReactWrapper } from 'enzyme'

import * as SettingsModal from '../../../app/renderer/components/settingsmodal'
import * as sinon from 'sinon'
import { SettingsFactory } from '../../../app/renderer/models/settings'

use(chaiEnzyme())

describe('settingsModal', function() {
  let wrapper: ReactWrapper = null
  let instance: SettingsModal.SettingsModal = null
  let onSettingsToggle: sinon.SinonSpy = null
  let onTabToggle: sinon.SinonSpy = null
  let changeSetting: sinon.SinonSpy = null
  let tabChange: any = null
  let tab: string
  let inputScrollBackCheck: any = null
  before(function() {
    onSettingsToggle = sinon.spy()
    changeSetting = sinon.spy()
    wrapper = mount(
      <SettingsModal.SettingsModal
        toggleTab={'1'}
        visible={true}
        className={'test'}
        settings={SettingsFactory()}
        onSettingsToggle={onSettingsToggle}
        onTabToggle={onTabToggle}
        changeSetting={changeSetting}
      />
    )
    instance = wrapper.instance() as SettingsModal.SettingsModal
  })
  it('should exist', function() {
    expect(SettingsModal.SettingsModal).to.exist
  })
  describe('scrollback', function() {
    it('should be able to set scrollback on and off', function() {
      inputScrollBackCheck = mount(
        <Input checked={true} onChange={instance.toggleScrollback} />
      )
      inputScrollBackCheck.simulate('change')
      expect(instance.props.changeSetting).to.have.been.called
    })
    it('should be able to change scrollback', function() {
      inputScrollBackCheck = mount(
        <Input value={500} onChange={instance.setScrollback} />
      )
      expect(instance.props.changeSetting).to.have.been.called
    })
  })
  describe('timestamps', function() {
    it('should be able to set timestamps on and off', function() {
      inputScrollBackCheck = mount(
        <Input checked={true} onChange={instance.toggleTimestamps} />
      )
      inputScrollBackCheck.simulate('change')
      expect(instance.props.changeSetting).to.have.been.called
    })
    it('should be able to change timestamps', function() {
      inputScrollBackCheck = mount(
        <Input value={'test'} onChange={instance.setTimestamps} />
      )
      expect(instance.props.changeSetting).to.have.been.called
    })
  })
  describe('timestamps', function() {
    it('should be able to set timestamps on and off', function() {
      inputScrollBackCheck = mount(
        <Input checked={true} onChange={instance.toggleTimestamps} />
      )
      inputScrollBackCheck.simulate('change')
      expect(instance.props.changeSetting).to.have.been.called
    })
    it('should be able to change timestamps', function() {
      inputScrollBackCheck = mount(
        <Input value={'test'} onChange={instance.setTimestamps} />
      )
      expect(instance.props.changeSetting).to.have.been.called
    })
  })
  describe('Away Messages', function() {
    it('should be able to set automatic mark away on and off', function() {
      inputScrollBackCheck = mount(
        <Input checked={true} onChange={instance.toggleMarkAway} />
      )
      inputScrollBackCheck.simulate('change')
      expect(instance.props.changeSetting).to.have.been.called
    })
    it('should be able to change quit message', function() {
      inputScrollBackCheck = mount(
        <Input value={'test'} onChange={instance.setQuitMessage} />
      )
      expect(instance.props.changeSetting).to.have.been.called
    })
    it('should be able to change leave message', function() {
      inputScrollBackCheck = mount(
        <Input value={'test'} onChange={instance.setLeaveMessage} />
      )
      expect(instance.props.changeSetting).to.have.been.called
    })
    it('should be able to change away message', function() {
      inputScrollBackCheck = mount(
        <Input value={'test'} onChange={instance.setAwayMessage} />
      )
      expect(instance.props.changeSetting).to.have.been.called
    })
  })
  describe('Hide Messages Toggles', function() {
    it('should be able to toggle hide join ', function() {
      inputScrollBackCheck = mount(
        <Input checked={true} onChange={instance.toggleHideJoinMessage} />
      )
      inputScrollBackCheck.simulate('change')
      expect(instance.props.changeSetting).to.have.been.called
    })
    it('should be able to toggle hide nick change message ', function() {
      inputScrollBackCheck = mount(
        <Input checked={true} onChange={instance.toggleHideNickChangeMessage} />
      )
      inputScrollBackCheck.simulate('change')
      expect(instance.props.changeSetting).to.have.been.called
    })
  })
  describe('URL grabber', function() {
    it('should be able to toggle URL Grabber', function() {
      inputScrollBackCheck = mount(
        <Input checked={true} onChange={instance.toggleUrlGrabber} />
      )
      inputScrollBackCheck.simulate('change')
      expect(instance.props.changeSetting).to.have.been.called
    })
    it('should be able to change URL grabber length', function() {
      inputScrollBackCheck = mount(
        <Input value={50} onChange={instance.setMaxUrl} />
      )
      inputScrollBackCheck.simulate('change')
      expect(instance.props.changeSetting).to.have.been.called
    })
  })
})
