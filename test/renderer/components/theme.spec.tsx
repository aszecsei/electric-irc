import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'

import * as React from 'react'
import { mount, render, shallow, ReactWrapper } from 'enzyme'

import { Theme } from '../../../app/renderer/components/theme'

use(chaiEnzyme())

describe('theme component', function() {
  it('should exist', function() {
    expect(Theme).to.exist
  })
})
