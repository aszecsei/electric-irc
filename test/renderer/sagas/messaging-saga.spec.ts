import { expect, use } from 'chai'
import * as sinon from 'sinon'
import { ChannelFactory } from '../../../app/renderer/models/channel'
import * as sinonChai from 'sinon-chai'
import { fork, take, call, put, cancel } from 'redux-saga/effects'
import { List } from 'immutable'
import * as IRC from 'irc'
import * as ActionTypes from '../../../app/renderer/actions'
import { ElectricState } from '../../../app/renderer/store'
import { defaultStore } from '../../../app/renderer/reducers/reducers'
import * as rootSaga from '../../../app/renderer/sagas/messaging-saga'
import { Action } from 'redux'
import {
  Connection,
  ConnectionFactory
} from '../../../app/renderer/models/connections'

use(sinonChai)
