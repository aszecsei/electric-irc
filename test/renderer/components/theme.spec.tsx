import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

import * as React from 'react'
import { mount, render, shallow, ShallowWrapper } from 'enzyme'

import { Theme } from '../../../app/renderer/components/theme'
import { SettingsFactory } from '../../../app/renderer/models/settings'

import { Map } from 'immutable'
import * as themes from '../../../app/renderer/stylesheets/thememaps/themes'
import * as AddModal from '../../../app/renderer/components/addmodal'

use(chaiEnzyme())
use(sinonChai)

describe('theme component', function() {
  const darkTheme = themes.theme.get('dark')
  const lightTheme = themes.theme.get('light')

  let wrapper: ShallowWrapper
  let instance: Theme
  let sandbox: sinon.SinonSandbox

  it('should exist', function() {
    expect(Theme).to.exist
  })

  describe('given different properties', function() {
    before(function() {
      sandbox = sinon.createSandbox()

      wrapper = shallow(
        <Theme properties={darkTheme}>
          <div />
        </Theme>
      )
      instance = wrapper.instance() as Theme

      sandbox.stub(instance, 'handleNewProperties')
    })

    it('should change properties', function() {
      wrapper.setProps({ properties: lightTheme })
      expect(instance.handleNewProperties).to.be.calledOnce
    })

    after(function() {
      sandbox.restore()
    })
  })

  describe('given the same properties', function() {
    before(function() {
      sandbox = sinon.createSandbox()

      wrapper = shallow(
        <Theme properties={darkTheme}>
          <div />
        </Theme>
      )
      instance = wrapper.instance() as Theme

      sandbox.stub(instance, 'handleNewProperties')
    })

    it('should not properties', function() {
      wrapper.setProps({ properties: darkTheme })
      expect(instance.handleNewProperties).to.not.be.called
    })

    after(function() {
      sandbox.restore()
    })
  })
})
