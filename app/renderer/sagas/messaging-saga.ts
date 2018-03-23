import { eventChannel } from 'redux-saga'
import { fork, take, call, put, cancel } from 'redux-saga/effects'
import * as irc from 'irc'
import * as actions from '../actions'
import { Connection } from '../models/connections'
import { Message } from '../models/message'

function connect(payload: actions.IAddServerAction) {
  // TODO: Connect to a server; do what's in add-server.ts
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
            new Message(message.rawCommand)
          )
        )
      }
    })
    return () => {}
  })
}

function* read(client: irc.Client, connection: Connection) {
  const channel = yield call(subscribe, client, connection)
  while (true) {
    let action = yield take(channel)
    yield put(action)
  }
}

function* write(client: irc.Client, connection: Connection) {
  while (true) {
    const payload = yield take(actions.ActionTypeKeys.SEND_MESSAGE)
    // TODO: Handle sending the message
    // TODO: Append message to log
  }
}

function* handleIO(client: irc.Client, connection: Connection) {
  yield fork(read, client, connection)
  yield fork(write, client, connection)
}

function* flow() {
  while (true) {
    // TODO: Investigate adding multiple servers
    let payload = yield take(actions.ActionTypeKeys.ADD_SERVER)
    const { client, connection } = yield call(connect, payload)

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
