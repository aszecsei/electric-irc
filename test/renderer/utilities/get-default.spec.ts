import { expect, use } from 'chai'
import { Map } from 'immutable'

import { get } from '../../../app/renderer/utilities/get-default'

describe('get default', function() {
  const map = Map.of('hello', 'world', 'face', 'off')

  describe('getting a value that exists', function() {
    it('returns the value', function() {
      expect(get(map, 'hello', 'none')).to.eq('world')
    })

    it('returns the value', function() {
      expect(get(map, 'face', 'none')).to.eq('off')
    })
  })

  describe('getting a value that does not exist', function() {
    it('returns the default value', function() {
      expect(get(map, 'box', 'none')).to.eq('none')
    })
  })
})
