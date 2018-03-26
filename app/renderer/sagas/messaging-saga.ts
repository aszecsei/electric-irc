import { eventChannel } from 'redux-saga'
import { fork, take, call, put, cancel } from 'redux-saga/effects'
import * as irc from 'irc'
import * as actions from '../actions'
import { Connection, ConnectionFactory } from '../models/connections'
import { MessageFactory } from '../models/message'
import { ChannelFactory, Channel } from '../models/channel'

import { List } from 'immutable'

function createIRCClient(url: string, nickname: string, channels: string[]) {
  return new irc.Client(url, nickname, {
    channels: channels
  })
}

function connect(action: actions.IAddServerAction, id: number) {
  let chanId = 0
  const connection = new ConnectionFactory({
    id: id,
    name: action.name,
    channels: List<Channel>(
      action.channels.map(chanName => {
        chanId += 1
        return new ChannelFactory({
          id: chanId,
          name: chanName
        })
      })
    )
  })
  const client = createIRCClient(action.url, action.nickname, action.channels)
  return {
    client,
    connection,
    chanId
  }
}

function subscribe(client: irc.Client, connection: Connection) {
  return eventChannel(emit => {
    client.addListener('raw', (message: irc.IMessage) => {
      // TODO: Get the actual channel
      const channel = connection.channels.get(0)
      if (channel) {
        emit(
          actions.appendLog(
            connection.id,
            channel.id,
            new MessageFactory({
              text: JSON.stringify(message)
            })
          )
        )
      }
    })
    return () => {}
  })
}

export function* read(client: irc.Client, connection: Connection) {
  const channel = yield call(subscribe, client, connection)
  while (true) {
    let action = yield take(channel)
    yield put(action)
  }
}

export function* write(client: irc.Client, connection: Connection) {
  while (true) {
    const payload: actions.ISendMessageAction = yield take(
      actions.ActionTypeKeys.SEND_MESSAGE
    )
    const channel = connection.channels.find(value => {
      return value.id === payload.channelId
    })

    if (channel) {
      // Send the message
      client.say(channel.name, payload.message.text)

      // Append message to log
      yield put(actions.appendLog(connection.id, channel.id, payload.message))
    }
  }
}

export function* handleIO(client: irc.Client, connection: Connection) {
  yield fork(read, client, connection)
  yield fork(write, client, connection)
}

export function* flow() {
  let currId = 0
  while (true) {
    // TODO: Investigate adding multiple servers
    let payload = yield take(actions.ActionTypeKeys.ADD_SERVER)
    const { client, connection } = yield call(connect, payload, currId)
    yield put(actions.addConnection(connection))
    currId += 1

    console.log('Hello?')
    const task = yield fork(handleIO, client, connection)

    let action = yield take(actions.ActionTypeKeys.REMOVE_SERVER)
    yield cancel(task)
    const ircClient = client as irc.Client
    ircClient.disconnect('Bye!!!', () => {})
  }
}

export default function* rootSaga() {
  yield fork(flow)
}
