import { expect, use } from 'chai'

import {
  getConnection,
  getChannel,
  getChannelByName
} from '../../../app/renderer/sagas/selectors'

import {
  ElectricState,
  ElectricStateFactory
} from '../../../app/renderer/store'
import {
  Connection,
  ConnectionFactory,
  Guid,
  Channel,
  ChannelFactory
} from '../../../app/renderer/models'
import { List } from 'immutable'

const conn1ID = Guid.create()
const conn1Name = 'Connection 1'
const conn2ID = Guid.create()
const conn2Name = 'Connection 2'
const chann1ID = Guid.create()
const chann1Name = 'Channel 1'
const chann2ID = Guid.create()
const chann2Name = 'Channel 2'

const state = ElectricStateFactory({
  connections: List<Connection>([
    new ConnectionFactory({
      name: conn1Name,
      id: conn1ID,
      channels: List<Channel>([
        new ChannelFactory({
          name: chann1Name,
          id: chann1ID
        }),
        new ChannelFactory({
          id: chann2ID,
          name: chann2Name
        })
      ])
    }),
    new ConnectionFactory({
      name: conn2Name,
      id: conn2ID
    })
  ])
})

describe('get connection', function() {
  it('retrieves a connection', function() {
    const retrieved = getConnection(state, conn1ID)
    expect(retrieved.name).to.eq(conn1Name)
  })

  it('does not retrieve nonexistent connections', function() {
    const retrieved = getConnection(state, Guid.create())
    expect(retrieved).to.be.undefined
  })
})

describe('get channel', function() {
  it('retrieves a channel', function() {
    const retrieved = getChannel(state, conn1ID, chann1ID)
    expect(retrieved.name).to.eq(chann1Name)
  })

  it('does not retrieve a channel from another server', function() {
    const retrieved = getChannel(state, conn2ID, chann1ID)
    expect(retrieved).to.be.undefined
  })

  it('does not retrieve a channel from a non-existent server', function() {
    const retrieved = getChannel(state, Guid.create(), Guid.create())
    expect(retrieved).to.be.undefined
  })
})

describe('get channel by name', function() {
  it('retrieves a channel', function() {
    const retrieved = getChannelByName(state, conn1ID, chann1Name)
    expect(retrieved.id).to.eq(chann1ID)
  })

  it('does not retrieve a channel from another server', function() {
    const retrieved = getChannelByName(state, conn2ID, chann1Name)
    expect(retrieved).to.be.undefined
  })

  it('does not retrieve a channel from a non-existent server', function() {
    const retrieved = getChannelByName(state, Guid.create(), '')
    expect(retrieved).to.be.undefined
  })
})
