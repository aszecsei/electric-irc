import { expect, use } from 'chai'

import * as client from '../../../renderer/models/client'

describe('client', function() {
  let instance: client.Client
  beforeEach(function() {
    instance = new client.Client('Hello', null)
  })

  it('should have a name', function() {
    expect(instance.name).to.eq('Hello')
  })

  it('should have an IRC connection', function() {
    expect(instance.client).to.eq(null)
  })
})
