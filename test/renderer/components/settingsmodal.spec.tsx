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
import { mount, render, shallow, ShallowWrapper } from 'enzyme'

import * as SettingsModal from '../../../app/renderer/components/settingsmodal'
import * as sinon from 'sinon'
import { SettingsFactory } from '../../../app/renderer/models/settings'
import {map} from "../../../app/renderer/stylesheets/thememaps/defaults";
import {backup} from "../../../app/renderer/stylesheets/thememaps/themes";

use(chaiEnzyme())

const createFakeEvent = (value: any) => {
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

describe('settingsModal', function() {
  let wrapper: ShallowWrapper
  let instance: SettingsModal.SettingsModal
  let onSettingsToggle: sinon.SinonSpy
  let onTabToggle: sinon.SinonSpy
  let changeSetting: sinon.SinonSpy
  let addTheme: sinon.SinonSpy
  let playWithTheme: sinon.SinonSpy
  let inputScrollBackCheck: ShallowWrapper
  let changeTheme: sinon.SinonSpy
  before(function() {
    onSettingsToggle = sinon.spy()
    changeSetting = sinon.spy()
    onTabToggle = sinon.spy()
    changeTheme = sinon.spy()
    addTheme = sinon.spy()
    playWithTheme =sinon.spy()
    wrapper = shallow(
      <SettingsModal.SettingsModal
        visible={true}
        onSettingsToggle={onSettingsToggle}
        onTabToggle={onTabToggle}
        changeSetting={changeSetting}
        toggleTab={'1'}
        className={'test'}
        settings={new SettingsFactory()}
        changeTheme={changeTheme}
        currentTheme={'dark'}
        themes={map}
        addTheme={addTheme}
        thistheme={backup}
        playWithTheme = {playWithTheme}
      />
    )
    instance = wrapper.instance() as SettingsModal.SettingsModal
  })
  it('should exist', function() {
    expect(SettingsModal.SettingsModal).to.exist
  })
  describe('scrollback', function() {
    it('should be able to set scrollback on and off', function() {
      inputScrollBackCheck = shallow(
        <Input checked={true} onChange={instance.toggleScrollback} />
      )
      inputScrollBackCheck.simulate('change')
      expect(instance.props.changeSetting).to.have.been.called
    })
    it('should be able to change scrollback', function() {
      inputScrollBackCheck = shallow(
        <Input value={500} onChange={instance.setScrollback} />
      )
      expect(instance.props.changeSetting).to.have.been.called
    })
  })
  describe('timestamps', function() {
    it('should be able to set timestamps on and off', function() {
      inputScrollBackCheck = shallow(
        <Input checked={true} onChange={instance.toggleTimestamps} />
      )
      inputScrollBackCheck.simulate('change')
      expect(instance.props.changeSetting).to.have.been.called
    })
    it('should be able to change timestamps', function() {
      inputScrollBackCheck = shallow(
        <Input value={'test'} onChange={instance.setTimestamps} />
      )
      expect(instance.props.changeSetting).to.have.been.called
    })
  })
  describe('timestamps', function() {
    it('should be able to set timestamps on and off', function() {
      inputScrollBackCheck = shallow(
        <Input checked={true} onChange={instance.toggleTimestamps} />
      )
      inputScrollBackCheck.simulate('change')
      expect(instance.props.changeSetting).to.have.been.called
    })
    it('should be able to change timestamps', function() {
      inputScrollBackCheck = shallow(
        <Input value={'test'} onChange={instance.setTimestamps} />
      )
      expect(instance.props.changeSetting).to.have.been.called
    })
  })
  describe('Away Messages', function() {
    it('should be able to set automatic mark away on and off', function() {
      inputScrollBackCheck = shallow(
        <Input checked={true} onChange={instance.toggleMarkAway} />
      )
      inputScrollBackCheck.simulate('change')
      expect(instance.props.changeSetting).to.have.been.called
    })
    it('should be able to change quit message', function() {
      inputScrollBackCheck = shallow(
        <Input value={'test'} onChange={instance.setQuitMessage} />
      )
      expect(instance.props.changeSetting).to.have.been.called
    })
    it('should be able to change leave message', function() {
      inputScrollBackCheck = shallow(
        <Input value={'test'} onChange={instance.setLeaveMessage} />
      )
      expect(instance.props.changeSetting).to.have.been.called
    })
    it('should be able to change away message', function() {
      inputScrollBackCheck = shallow(
        <Input value={'test'} onChange={instance.setAwayMessage} />
      )
      expect(instance.props.changeSetting).to.have.been.called
    })
  })
  describe('Hide Messages Toggles', function() {
    it('should be able to toggle hide join ', function() {
      inputScrollBackCheck = shallow(
        <Input checked={true} onChange={instance.toggleHideJoinMessage} />
      )
      inputScrollBackCheck.simulate('change')
      expect(instance.props.changeSetting).to.have.been.called
    })
    it('should be able to toggle hide nick change message ', function() {
      inputScrollBackCheck = shallow(
        <Input checked={true} onChange={instance.toggleHideNickChangeMessage} />
      )
      inputScrollBackCheck.simulate('change')
      expect(instance.props.changeSetting).to.have.been.called
    })
  })
  describe('URL grabber', function() {
    it('should be able to toggle URL Grabber', function() {
      inputScrollBackCheck = shallow(
        <Input checked={true} onChange={instance.toggleUrlGrabber} />
      )
      inputScrollBackCheck.simulate('change')
      expect(instance.props.changeSetting).to.have.been.called
    })
    it('should be able to change URL grabber length', function() {
      inputScrollBackCheck = shallow(
        <Input value={50} onChange={instance.setMaxUrl} />
      )
      inputScrollBackCheck.simulate('change', createFakeEvent(50))
      expect(instance.props.changeSetting).to.have.been.called
    })
  })
    describe('Color Chooser', ()=>{
        it('should change color if color is changed', ()=>{
            instance.playWithTheme("yellow")
            expect(instance.props.playWithTheme).to.have.been.called
        })
        it('should save the theme', ()=>{
            instance.savetheme()
            expect(instance.props.addTheme).to.have.been.called
        })
    })
})
