import { List } from 'immutable'
import { AnyAction } from 'redux'
import { ElectricState } from '../store'
import {
  ActionTypeKeys,
  IAddServerAction,
  IAppendLogAction,
  IEditServerAction,
  IJoinChannelAction,
  IRemoveServerAction,
  ISendMessageAction,
  IViewChannelAction
} from '../actions'

import addServer from './add-server'
import appendLog from './append-log'
import editServer from './edit-server'
import joinChannel from './join-channel'
import removeServer from './remove-server'
import sendMessage from './send-message'
import viewChannel from './view-channel'

export const defaultStore: ElectricState = {
  connections: List([]),
  currentChannel: undefined,
  currentConnection: undefined,
  lastUsedChannelId: 0,
  lastUsedConnectionId: 0
}

export function defaultReducer(
  state: ElectricState,
  action: AnyAction
): ElectricState {
  // Note: We don't need break statements since we're returning values
  switch (action.type) {
    case ActionTypeKeys.ADD_SERVER:
      return addServer(state, action as IAddServerAction)
    case ActionTypeKeys.APPEND_LOG:
      return appendLog(state, action as IAppendLogAction)
    case ActionTypeKeys.EDIT_SERVER:
      return editServer(state, action as IEditServerAction)
    case ActionTypeKeys.JOIN_CHANNEL:
      return joinChannel(state, action as IJoinChannelAction)
    case ActionTypeKeys.REMOVE_SERVER:
      return removeServer(state, action as IRemoveServerAction)
    case ActionTypeKeys.SEND_MESSAGE:
      return sendMessage(state, action as ISendMessageAction)
    case ActionTypeKeys.VIEW_CHANNEL:
      return viewChannel(state, action as IViewChannelAction)
    default:
      return state
  }
}
