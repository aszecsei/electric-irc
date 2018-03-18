import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'

import * as React from 'react'
import { mount, render, shallow, ReactWrapper } from 'enzyme'

import { ChatWindow } from '../../../renderer/components/ircwindow'

use(chaiEnzyme())

describe('irc window', function() {
  it('should exist', function() {
    expect(ChatWindow).to.exist
  })
})
