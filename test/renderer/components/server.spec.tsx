import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

import * as React from 'react'
import { mount, render, shallow, ReactWrapper } from 'enzyme'

import { List } from 'immutable'

import * as server from '../../../app/renderer/components/server'
import { ConnectionFactory } from '../../../app/renderer/models/connections'
import { ChannelFactory } from '../../../app/renderer/models/channel'

use(chaiEnzyme())
use(sinonChai)

describe('server panel', function() {
  let wrapper: ReactWrapper = null
  let instance: server.Server = null
  let onClick: sinon.SinonSpy = null

  before(function() {
    onClick = sinon.spy()
    wrapper = mount(
      <server.Server
        onChannelClick={onClick}
        connection={
          new ConnectionFactory({
            id: 0,
            name: 'Connection 1',
            channels: List([
              new ChannelFactory({ id: 1, name: '#channel1' }),
              new ChannelFactory({ id: 2, name: '#channel2' })
            ])
          })
        }
      />
    )
    instance = wrapper.instance() as server.Server
  })

  it('should exist', function() {
    expect(server.Server).to.exist
  })

  describe('toggle', function() {
    it('should initialize to collapsed', function() {
      expect(instance.state.collapse).to.be.false
      expect(instance.state.icon).to.eq('expand_more')
    })

    it('should change to expanded', function() {
      instance.toggle()
      expect(instance.state.collapse).to.be.true
      expect(instance.state.icon).to.eq('expand_less')
    })

    it('should change to collapsed', function() {
      instance.toggle()
      expect(instance.state.collapse).to.be.false
      expect(instance.state.icon).to.eq('expand_more')
    })
  })
})
