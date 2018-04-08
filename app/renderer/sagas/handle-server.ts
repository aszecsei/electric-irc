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
    channels: channels
  })
}

export function connect(action: actions.IAddServerAction) {
  var channels = ['#']
  channels = channels.concat(action.channels)
  const connection = new ConnectionFactory({
    id: Guid.create(),
    nickname: action.nickname,
    name: action.name,
    channels: List<Channel>(
      channels.map(chanName => {
        return new ChannelFactory({
          id: Guid.create(),
          name: chanName
        })
      })
    )
  })
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
    let task = yield fork(
      handleChannel,
      ircClient,
      typedConnection,
      typedConnection.channels.get(i)!
    )
    channelTasks = channelTasks.push(task)
  }

  // Handle added channels
  let joinTask = yield fork(handleJoinChannels, ircClient, typedConnection.id)

  // TODO: This will have to change to make sure we're talking about the right server...
  let action = yield take(actions.ActionTypeKeys.REMOVE_SERVER)

  console.log('Canceling channel listeners...')
  for (let i = 0; i < channelTasks.count(); i++) {
    yield cancel(channelTasks.get(i)!)
  }
  yield cancel(joinTask)

  ircClient.disconnect('Bye!!!', () => {})
}
