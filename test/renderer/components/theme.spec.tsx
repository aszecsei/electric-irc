import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'

import * as React from 'react'
import { mount, render, shallow, ReactWrapper } from 'enzyme'

import { Theme } from '../../../app/renderer/components/theme'
import { SettingFactory } from '../../../app/renderer/models/settings'
import * as sinon from 'sinon'
import { Map } from 'immutable'
import * as themes from '../../../app/renderer/stylesheets/thememaps/themes'

use(chaiEnzyme())
describe('theme component', function() {
  before(() => {
    properties = themes.backup
    wrapper = mount(<Theme properties={this.properties} />)
  })
  it('should exist', function() {
    expect(Theme).to.exist
  })
  it('should exist', function() {
    wrapper.expect(wrapper.ComponentDidMount()).to.be.called
  })
})
