import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'

import * as React from 'react'
import { mount, render, shallow, ReactWrapper } from 'enzyme'

import * as SettingsModal from '../../../app/renderer/components/settingsmodal'
import * as sinon from 'sinon'
import { SettingFactory } from '../../../app/renderer/models/settings'

use(chaiEnzyme())

describe('settingsModal', function() {
  let wrapper: ReactWrapper = null
  let instance: SettingsModal.SettingsModal = null
  let onSettingsToggle: sinon.SinonSpy = null
  let onTabToggle: sinon.SinonSpy = null
  let changeSetting: sinon.SinonSpy = null

  before(function() {
    wrapper = mount(
      <SettingsModal.SettingsModal
        toggleTab={'1'}
        visible={true}
        className={'test'}
        settings={SettingFactory()}
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
})
