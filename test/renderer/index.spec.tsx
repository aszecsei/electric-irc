const globalAny: any = global

import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

import * as React from 'react'
import { mount, render, shallow, ShallowWrapper } from 'enzyme'

import * as electron from 'electron'
import * as irc from 'irc'

import * as app from '../../app/renderer/index'
import { Titlebar } from '../../app/renderer/components/titlebar'

use(chaiEnzyme())
use(sinonChai)

describe('main application', function() {
  let sandbox: sinon.SinonSandbox

  let wrapper: ShallowWrapper = null
  let window: app.App = null

  describe('window', function() {
    before(function() {
      sandbox = sinon.createSandbox()

      // TODO: Use the sandbox to stub anything out that needs to be stubbed

      wrapper = shallow(<app.App />)
      window = wrapper.instance() as app.App
    })

    after(function() {
      wrapper.unmount()
      sandbox.restore()
      // TODO: This is useful in case Mocha hangs
      // globalAny.asyncDump();
    })

    it('should have a titlebar', function() {
      expect(wrapper.find(Titlebar)).to.exist
    })

    describe('handleClose', function() {
      it('should respond to handleClose', function() {
        expect(window)
          .to.have.property('handleClose')
          .that.is.a('function')
      })

      // TODO: Stub out electron's remote process
      /*
      it('should access the remote electron process', function() {
        let mockWindow = {
          close: sinon.spy()
        }
        let mockRemote = {
          getCurrentWindow: function() mockWindow
        }
        sinon.stub(electron, 'remote').returns(mockRemote)

        window.handleClose(null)
        expect(electron.remote).to.have.been.called
        
        sinon.restore(electron.remote)
      })

      it('should close the window', function() {
        let mockWindow = {
          close: sinon.spy()
        }
        let mockRemote = {
          getCurrentWindow: function() mockWindow
        }
        sinon.stub(electron, 'remote').returns(mockRemote)

        window.handleClose(null)
        expect(mockWindow.close).to.have.been.called

        sinon.restore(electron.remote)
      })
      */
    })

    describe('handleMinimize', function() {
      it('should respond to handleMinimize', function() {
        expect(window)
          .to.have.property('handleMinimize')
          .that.is.a('function')
      })
    })

    describe('handleMaximize', function() {
      it('should respond to handleMaximize', function() {
        expect(window)
          .to.have.property('handleMaximize')
          .that.is.a('function')
      })
    })

    describe('render', function() {
      it('should respond to render', function() {
        expect(window)
          .to.have.property('render')
          .that.is.a('function')
      })
    })
  })
})
