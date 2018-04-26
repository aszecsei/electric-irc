import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'

import * as React from 'react'
import { mount, render, shallow, ReactWrapper } from 'enzyme'
import {
  Connection,
  ConnectionFactory
} from '../../../app/renderer/models/connections'
import { Channel, ChannelFactory,Message, MessageFactory,SettingsFactory } from '../../../app/renderer/models'

import { List } from 'immutable'
import { ChatWindow } from '../../../app/renderer/components/ircwindow'
import { Guid } from '../../../app/renderer/models/guid'

use(chaiEnzyme())

describe('irc window', function() {
  const wrapper = shallow(
    <ChatWindow
      connection={
        new ConnectionFactory({
          id: Guid.create(),
          name: 'Connection 1',
          channels: List([
            new ChannelFactory({ id: Guid.create(), name: '#channel1' }),
            new ChannelFactory({ id: Guid.create(), name: '#channel2' })
          ])
        })
      }
      channel={new ChannelFactory({ id: Guid.create(), name: '#channel2' })}
      messages={List([new MessageFactory({})])}
      onSendMessage={(message: string, conn: Connection, channel: Channel) =>
        null
      }
      settings={SettingsFactory()}
    />
  )
  it('should exist', function() {
    expect(ChatWindow).to.exist
    const instance = wrapper.instance() as ChatWindow
    instance.componentDidUpdate()
    expect(ChatWindow).to.exist
  })
})
