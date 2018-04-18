import { expect, use } from 'chai'

import {
  defaultStore,
  defaultReducer
} from '../../../app/renderer/reducers/reducers'
import { editServer } from '../../../app/renderer/actions'
import { Guid } from '../../../app/renderer/models'

const initialState = defaultStore
const serverGuid = Guid.create()
const newServerName = 'Hello!'
const newURL = 'chat.freenode.net'

describe('edit server', function() {
  const action = editServer(serverGuid, '', newURL)
  const newState = defaultReducer(initialState, action)

  // TODO: Change this
  it('should not modify the state', function() {
    expect(newState).to.eq(initialState)
  })
})
