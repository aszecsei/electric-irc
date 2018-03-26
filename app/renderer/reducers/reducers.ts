import { AnyAction } from 'redux'
import { ElectricState, ElectricStateFactory } from '../store'
import {
  ActionTypeKeys,
  IAddServerAction,
  IAppendLogAction,
  IEditServerAction,
  IJoinChannelAction,
  IRemoveServerAction,
  ISendMessageAction,
  IViewChannelAction,
  IToggleAddServerModalAction,
  IAddConnectionAction
} from '../actions'

import addConnection from './add-connection'
import appendLog from './append-log'
import editServer from './edit-server'
import joinChannel from './join-channel'
import removeServer from './remove-server'
import viewChannel from './view-channel'
import toggleAddServerModal from './toggle-add-server-modal'

export const defaultStore = new ElectricStateFactory({})

export function defaultReducer(
  state: ElectricState,
  action: AnyAction
): ElectricState {
  // Note: We don't need break statements since we're returning values
  switch (action.type) {
    case ActionTypeKeys.ADD_CONNECTION:
      return addConnection(state, action as IAddConnectionAction)
    case ActionTypeKeys.APPEND_LOG:
      return appendLog(state, action as IAppendLogAction)
    case ActionTypeKeys.EDIT_SERVER:
      return editServer(state, action as IEditServerAction)
    case ActionTypeKeys.JOIN_CHANNEL:
      return joinChannel(state, action as IJoinChannelAction)
    case ActionTypeKeys.REMOVE_SERVER:
      return removeServer(state, action as IRemoveServerAction)
    case ActionTypeKeys.VIEW_CHANNEL:
      return viewChannel(state, action as IViewChannelAction)
    case ActionTypeKeys.UI_TOGGLE_ADD_SERVER_MODAL:
      return toggleAddServerModal(state, action as IToggleAddServerModalAction)
    default:
      return state
  }
}
