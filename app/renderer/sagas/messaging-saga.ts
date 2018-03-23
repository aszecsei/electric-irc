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
import { ElectricState, EState } from '../store'

function* watchGetMessage() {
  while (true) {
    let EState = yield select(EState)
    yield takeEvery('APPEND_LOG', appendLog)
  }
}
function* appendLog() {
  yield put({ type: 'APPEND_LOG' })
}
export default function* messageSaga() {
  yield all([watchGetMessage])
}
