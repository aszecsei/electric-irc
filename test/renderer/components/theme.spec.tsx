import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'

import * as React from 'react'
import { mount, render, shallow, ReactWrapper } from 'enzyme'

import { Theme } from '../../../app/renderer/components/theme'
import { SettingFactory } from '../../../app/renderer/models/settings'
import * as sinon from 'sinon'
import { Map } from 'immutable'
import * as themes from '../../../app/renderer/stylesheets/thememaps/themes'
import * as AddModal from '../../../app/renderer/components/addmodal'

use(chaiEnzyme())
describe('theme component', function() {
  let properties = themes.backup
  let wrapper: ReactWrapper = null
  let instance: any = null
  let theme: any = null
  before(() => {
    wrapper = mount(
      <Theme properties={properties}>
        <div />
      </Theme>
    )
    instance = wrapper.instance()
  })
  it('should exist', function() {
    expect(Theme).to.exist
  })
  it('should change state of name if valid', function() {
    instance.componentWillReceiveProps(themes.theme.get('light')!)
    expect(instance.handleNewProperties()).to.be.calledOnce
  })
})
