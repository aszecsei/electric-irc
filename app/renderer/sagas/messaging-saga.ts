import { fork, take } from 'redux-saga/effects'
import * as actions from '../actions'

import { handleServer } from '.'

export function* flow() {
  while (true) {
    let payload = yield take(actions.ActionTypeKeys.ADD_SERVER)
    yield fork(handleServer, payload)
  }
}

export default function* rootSaga() {
  yield fork(flow)
}
