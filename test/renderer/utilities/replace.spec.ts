import { expect, use } from 'chai'
import { List } from 'immutable'

import { replace } from '../../../app/renderer/utilities/replace'

describe('replace', function() {
  const oldList = List<string>(['a', 'aa', 'aaa'])

  describe('an existing element', function() {
    const oldValue = 'aa'
    const newValue = 'aaaa'
    const result = replace(oldList, oldValue, newValue)

    it('contains the new value', function() {
      expect(result.contains(newValue)).to.be.true
    })
    it('does not contain the old value', function() {
      expect(result.contains(oldValue)).to.be.false
    })
    it('has the same index for the new value as the old value', function() {
      const newIndex = result.findIndex(value => value === newValue)
      const oldIndex = oldList.findIndex(value => value === oldValue)
      expect(newIndex).to.eq(oldIndex)
    })
  })

  describe('a non-existing element', function() {
    const oldValue = 'aaaa'
    const newValue = 'aaaaa'
    const result = replace(oldList, 'aaaa', 'aaaaa')

    it('does not contain the new value', function() {
      expect(result.contains(newValue)).to.be.false
    })
    it('does not change the values', function() {
      expect(result).to.eq(oldList)
    })
  })
})
