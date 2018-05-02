import { call, cancel, fork, put, take, select } from 'redux-saga/effects'
import * as IRC from 'irc'
import { List } from 'immutable'

import * as actions from '../actions'
import {
  Channel,
  ChannelFactory,
  Connection,
  ConnectionFactory,
  Guid,
  Settings
} from '../models'
import { handleChannel, handleJoinChannels,handlePartChannels } from '.'
import { Task, eventChannel } from 'redux-saga'
import { getSettings } from './selectors'

export function createIRCClient(
  url: string,
  nickname: string,
  channels: string[]
) {
  return new IRC.Client(url, nickname, {
    userName: 'electricirc',
    channels,
    autoConnect: false,
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

function* connectToClient(serverId: Guid, client: IRC.Client) {
  const evChannel = eventChannel(emit => {
    console.log("CONNECTING...")
    client.connect(() => {
      console.log("CONNECTED!")
      emit(actions.makeServerConnected(
        serverId
      ))
    })
    client.addListener('error', (message: any) => {
      console.error(message)
    })
    return () => null
  })
  for (;;) {
    const action = yield take(evChannel)
    yield put(action)
  }
}

export function* handleServer(payload: actions.IAddServerAction) {
  const { client, connection } = yield call(connect, payload)
  yield put(actions.addConnection(connection))

  const typedConnection = connection as Connection
  const ircClient = client as IRC.Client

  yield fork(connectToClient, typedConnection.id, ircClient)

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
  const partTask = yield fork(handlePartChannels, ircClient, typedConnection.id)

  for(;;){// loop until actually removing connection
    const action: actions.IRemoveServerAction = yield take(actions.ActionTypeKeys.REMOVE_SERVER)
    if(action.id===typedConnection.id){// actually remove connection
      console.log('Canceling channel listeners...')
      for (let i = 0; i < channelTasks.count(); i++) {
        const task = channelTasks.get(i)
        if (task) {
          yield cancel(task)
        }
      }
      yield cancel(joinTask)
      yield cancel(partTask)
      const set:Settings=yield select(getSettings)
      ircClient.disconnect(set.defquit, () => null) 
      break
    }
  }
}
