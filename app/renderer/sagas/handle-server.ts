import { call, cancel, fork, put, take } from 'redux-saga/effects'
import * as IRC from 'irc'
import { List } from 'immutable'

import * as actions from '../actions'
import {
  Channel,
  ChannelFactory,
  Connection,
  ConnectionFactory,
  Guid
} from '../models'
import { handleChannel, handleJoinChannels } from '.'
import { Task } from 'redux-saga'

export function createIRCClient(
  url: string,
  nickname: string,
  channels: string[]
) {
  return new IRC.Client(url, nickname, {
    userName: 'electricirc',
    channels
  })
}

export function connect(action: actions.IAddServerAction) {
  let channels = ['#']
  const connection = new ConnectionFactory({
    id: Guid.create(),
    nickname: action.nickname,
    name: action.name,
    url: action.url,
    channels: List<Channel>(
      channels.map(chanName => {
        return new ChannelFactory({
          id: Guid.create(),
          name: chanName
        })
      })
    )
  })
  channels = channels.concat(action.channels)
  const client = createIRCClient(action.url, action.nickname, action.channels)
  return {
    client,
    connection
  }
}

export function* handleServer(payload: actions.IAddServerAction) {
  const { client, connection } = yield call(connect, payload)
  yield put(actions.addConnection(connection))

  const typedConnection = connection as Connection
  const ircClient = client as IRC.Client

  console.log('Adding channels...')
  let channelTasks = List<Task>([])
  for (let i = 0; i < typedConnection.channels.count(); i++) {
    const channel = typedConnection.channels.get(i)
    if (channel) {
      const task = yield fork(
        handleChannel,
        ircClient,
        typedConnection,
        channel
      )
      channelTasks = channelTasks.push(task)
    }
  }

  // Handle added channels
  const joinTask = yield fork(handleJoinChannels, ircClient, typedConnection.id)

  // TODO: This will have to change to make sure we're talking about the right server...
  const action = yield take(actions.ActionTypeKeys.REMOVE_SERVER)

  console.log('Canceling channel listeners...')
  for (let i = 0; i < channelTasks.count(); i++) {
    const task = channelTasks.get(i)
    if (task) {
      yield cancel(task)
    }
  }
  yield cancel(joinTask)

  ircClient.disconnect('Bye!!!', () => null)
}
