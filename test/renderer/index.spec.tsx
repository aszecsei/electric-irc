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

describe('main application', function() {
  let wrapper: ReactWrapper = null
  let window: app.Window = null
  let joined = false

  describe('window', function() {
    before(function(done) {
      this.timeout(10000)
      wrapper = mount(<app.Window />)
      window = wrapper.instance() as app.Window
      window.client.addListener('join', () => {
        if (!joined) {
          done()
          joined = true
        }
      })
    })

    after(function() {
      window.disconnect()
      window.client.conn.destroy()
      joined = false
    })

    it('should have a titlebar', function() {
      expect(wrapper.find('#titlebar')).to.exist
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
