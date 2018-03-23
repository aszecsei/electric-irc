import {
  actionChannel,
  call,
  takeEvery,
  put,
  race,
  all,
  select
} from 'redux-saga/effects'
import * as irc from 'irc'
import * as actions from '../actions'
import * as selectors from '../selectors'
function* watchGetMessage() {
  const connections: any = yield select(selectors.connections)
  while (true) {
    connections.on('raw', function(message: string) {
      appendLog(message)
    })
  }
}
function* appendLog(message: string) {
  yield put({ type: 'APPEND_LOG', message })
}
export default function* messageSaga() {
  yield all([watchGetMessage])
}
