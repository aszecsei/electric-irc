import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

import * as React from 'react'
import { mount, render, shallow, ReactWrapper } from 'enzyme'

import * as electron from 'electron'

import * as app from '../../app/renderer/index'

use(chaiEnzyme())
use(sinonChai)

describe('main application', () => {
  let wrapper: ReactWrapper = null
  let window: app.Window = null

  describe('window', () => {
    before(() => {
      wrapper = mount(<app.Window />)
      window = wrapper.instance() as app.Window
    })

    it('should have a titlebar', () => {
      expect(wrapper.find('#titlebar')).to.exist
    })

    describe('handleClose', () => {
      it('should respond to handleClose', () => {
        expect(window)
          .to.have.property('handleClose')
          .that.is.a('function')
      })

      // TODO: Stub out electron's remote process
      /*
      it('should access the remote electron process', () => {
        let mockWindow = {
          close: sinon.spy()
        }
        let mockRemote = {
          getCurrentWindow: () => mockWindow
        }
        sinon.stub(electron, 'remote').returns(mockRemote)

        window.handleClose(null)
        expect(electron.remote).to.have.been.called
        
        sinon.restore(electron.remote)
      })

      it('should close the window', () => {
        let mockWindow = {
          close: sinon.spy()
        }
        let mockRemote = {
          getCurrentWindow: () => mockWindow
        }
        sinon.stub(electron, 'remote').returns(mockRemote)

        window.handleClose(null)
        expect(mockWindow.close).to.have.been.called

        sinon.restore(electron.remote)
      })
      */
    })

    describe('handleMinimize', () => {
      it('should respond to handleMinimize', () => {
        expect(window)
          .to.have.property('handleMinimize')
          .that.is.a('function')
      })
    })

    describe('handleMaximize', () => {
      it('should respond to handleMaximize', () => {
        expect(window)
          .to.have.property('handleMaximize')
          .that.is.a('function')
      })
    })

    describe('render', () => {
      it('should respond to render', () => {
        expect(window)
          .to.have.property('render')
          .that.is.a('function')
      })
    })
  })
})
