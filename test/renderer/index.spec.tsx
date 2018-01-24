import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'

import * as React from 'react'
import {mount, render, shallow, ReactWrapper} from 'enzyme'

import * as app from '../../app/renderer/index'

use(chaiEnzyme())

describe('main application', () => {
  let wrapper: ReactWrapper = null
  let window: app.Window = null

  describe('window', () => {
    beforeEach(() => {
      wrapper = mount(<app.Window />)
      window = wrapper.instance() as app.Window
    })

    it('should have a titlebar', () => {
      expect(wrapper.find('#titlebar')).to.exist
    })
    
    it('should respond to handleClose', () => {
      expect(window).to.have.property('handleClose').that.is.a('function')
    })

    it('should respond to handleMinimize', () => {
      expect(window).to.have.property('handleMinimize').that.is.a('function')
    })

    it('should respond to handleMaximize', () => {
      expect(window).to.have.property('handleMaximize').that.is.a('function')
    })

    it('should respond to render', () => {
      expect(window).to.have.property('render').that.is.a('function')
    })
  })
})