import { expect, use } from 'chai'
import * as fileStorage from '../../app/common/file-storage'

describe('file storage event names', function() {
  it('has an event for saving a file', function() {
    expect(fileStorage.SAVE_FILE).to.exist
  })

  it('has a callback for saving a file', function() {
    expect(fileStorage.SAVE_FILE_COMPLETE).to.exist
  })

  it('has an event for reading a file', function() {
    expect(fileStorage.READ_FILE).to.exist
  })

  it('has a callback for reading a file', function() {
    expect(fileStorage.READ_FILE_COMPLETE).to.exist
  })
})
