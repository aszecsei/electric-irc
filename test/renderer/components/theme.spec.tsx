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
  let properties = themes.backup
  let wrapper: ReactWrapper = null
  before(() => {
    wrapper = mount(<Theme properties={properties} />)
  })
  it('should exist', function() {
    expect(Theme).to.exist
  })
  it('should exist', function() {
    const theme = sinon.stub(Theme.prototype, 'handleNewProperties')
    theme.reset()
    let themein = themes.backup
    wrapper.setProps({ themein })
    expect(theme).to.have.been.called()
  })
})
