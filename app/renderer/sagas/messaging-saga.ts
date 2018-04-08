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
  var channels = ['#']
  //channels = channels.concat(action.channels)
  const connection = new ConnectionFactory({
    id: id,
    nickname: action.nickname,
    name: action.name,
    channels: List<Channel>(
      channels.map(chanName => {
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
function* subscribe(client: irc.Client, connection: Connection) {
  return eventChannel(emit => {
    //join listener
    client.addListener(
      'join',
      (channel: irc.IChannel, nick: string, message: irc.IMessage) => {
        console.log('a')
        console.log(connection)
        console.log('b')
        console.log(nick)
        if (nick == client.nick) {
          console.log('c')
          console.log(channel.toString())
          console.log('d')
          console.log(connection.channels)
          emit(actions.joinChannel(connection.id, channel.toString()))
        }
      }
    )
    client.addListener('raw', (message: irc.IMessage) => {
      if (message.command != 'PONG') {
        //filter out PONGs
        //can get channel from ms iff it is a message type that is channel specific
        const ms = JSON.parse(JSON.stringify(message)) //turns to hash
        var channel
        console.log('*****************')
        if (ms['args'].length > 0 && ms['args'][0][0] == '#') {
          channel = connection.channels.find(
            (x, y, z) => x.name == ms['args'][0]
          )
        } else {
          channel = connection.channels.get(0)
        }
        console.log(connection) //you will see that this does not print out the same version of the connection in the store( only the original version of the connection)
        console.log(client)
        console.log(channel)
        console.log(message)
        console.log('*****************')
        if (channel) {
          var sender = ''
          if (ms.hasOwnProperty('nick')) {
            sender = ms['nick']
          } else if (ms.hasOwnProperty('server')) {
            sender = ms['server']
          }
          if (ms['rawCommand'] == '433' || ms['command'] == 'NICK') {
            //nick
            emit(actions.changeNick(connection.id, client.nick))
          }
          if (ms['command'] == 'NICK') {
            //if nick change
            connection.channels.map(x => {
              //for all channels
              //console.log(client.chans)
              if (
                (client.chans[x.name] &&
                  client.chans[x.name].users[ms['args'][0]]) ||
                x.name == '#'
              ) {
                //if the user who changed name is in there
                emit(
                  actions.appendLog(
                    connection.id,
                    x.id,
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
              return x
            })
          } else {
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
        }
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
    console.log(payload.channelId)
    const channel = connection.channels.find(value => {
      return value.id === payload.channelId
    })

    if (channel) {
      // Send the message
      //TODO:catch /commands
      //TODO: if /join join channel
      const recommand = /^\/[a-z]+/i
      const reres = recommand.exec(payload.message.text)
      if (reres) {
        const args = payload.message.text.split(' ').slice(1)
        client.send(reres[0].substring(1), ...args)
      } else if (client.chans[channel.name]) {
        client.say(channel.name, payload.message.text)
      }

      // Append message to log
      if (
        (!reres || !/^\/nick/i.exec(payload.message.text)) &&
        (client.chans[channel.name] || reres)
      ) {
        //prevents double message on using /nick
        yield put(actions.appendLog(connection.id, channel.id, payload.message))
      }
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
