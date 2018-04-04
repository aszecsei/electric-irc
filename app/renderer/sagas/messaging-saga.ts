import { eventChannel } from 'redux-saga'
import { fork, take, call, put, cancel } from 'redux-saga/effects'
import * as irc from 'irc'
import * as actions from '../actions'
import { Connection, ConnectionFactory } from '../models/connections'
import { MessageFactory } from '../models/message'
import { ChannelFactory, Channel } from '../models/channel'

import { List } from 'immutable'

export function createIRCClient(
  url: string,
  nickname: string,
  channels: string[]
) {
  return new irc.Client(url, nickname, {
    channels: channels
  })
}

export function connect(action: actions.IAddServerAction, id: number) {
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
      const ms = JSON.parse(JSON.stringify(message)) //turns to hash
      var channel //= connection.channels.get(0)
      //console.log(ms['args'].length)
      if (ms['args'].length > 0 && ms['args'][0][0] == '#') {
        channel = connection.channels.find((x, y, z) => x.name == ms['args'][0])
      } else {
        channel = connection.channels.get(0)
      }
      //can get channel from ms iff it is a message type that is channel specific
      if (channel) {
        //if(ms['args'][0][0]=="#"){//if directed at a channel
        //}
        var sender = ''
        if (ms.hasOwnProperty('nick')) {
          sender = ms['nick']
        } else if (ms.hasOwnProperty('server')) {
          sender = ms['server']
        }
        emit(
          actions.appendLog(
            connection.id,
            channel.id,
            new MessageFactory({
              text: JSON.stringify(message),
              prefix: ms['prefix'],
              command: ms['command'],
              rawCommand: ms['rawCommand'],
              commandType: ms['commandType'],
              args: ms['args'],
              sender: sender
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

export function* handleServer(payload: actions.IAddServerAction, id: number) {
  const { client, connection } = yield call(connect, payload, id)
  yield put(actions.addConnection(connection))

  console.log('Hello?')
  const task = yield fork(handleIO, client, connection)

  let action = yield take(actions.ActionTypeKeys.REMOVE_SERVER)
  yield cancel(task)
  const ircClient = client as irc.Client
  ircClient.disconnect('Bye!!!', () => {})
}

export function* flow() {
  let currId = 0
  while (true) {
    let payload = yield take(actions.ActionTypeKeys.ADD_SERVER)
    yield fork(handleServer, payload, currId)
    currId += 1
  }
}

export default function* rootSaga() {
  yield fork(flow)
}
