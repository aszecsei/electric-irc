import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'
import * as sinon from 'sinon'

import * as React from 'react'
import { shallow, mount } from 'enzyme'

import { AppLoader } from '../../../app/renderer/components/app-loader'

use(chaiEnzyme())

describe('app loader', function() {
  const sandbox = sinon.createSandbox()
  let componentDidMountSpy

  before(function() {
    componentDidMountSpy = sandbox.stub(
      AppLoader.prototype,
      'componentDidMount'
    )
  })

  it('calls componentDidMount', function() {
    const wrapper = mount(<AppLoader />)
    expect(componentDidMountSpy).to.have.been.calledOnce
  })

  it('starts without a store', function() {
    const wrapper = shallow(<AppLoader />)
    const inst = wrapper.instance() as AppLoader
    expect(inst.state.store).to.be.undefined
  })

  describe('titlebar', function() {
    it('has a handler for closing the app', function() {
      const wrapper = shallow(<AppLoader />)
      const inst = wrapper.instance() as AppLoader
      expect(inst)
        .have.property('handleClose')
        .that.is.a('function')
    })

    it('has a handler for maximizing the app', function() {
      const wrapper = shallow(<AppLoader />)
      const inst = wrapper.instance() as AppLoader
      expect(inst)
        .have.property('handleMaximize')
        .that.is.a('function')
    })

    it('has a handler for minimizing the app', function() {
      const wrapper = shallow(<AppLoader />)
      const inst = wrapper.instance() as AppLoader
      expect(inst)
        .have.property('handleMinimize')
        .that.is.a('function')
    })
  })
})
