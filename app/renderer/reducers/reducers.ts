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
  IToggleSettingsModalAction
} from '../actions'

import addServer from './add-server'
import appendLog from './append-log'
import editServer from './edit-server'
import joinChannel from './join-channel'
import removeServer from './remove-server'
import sendMessage from './send-message'
import viewChannel from './view-channel'
import toggleAddServerModal from './toggle-add-server-modal'
import toggleSettingsModal from './toggle-settings-modal'

export const defaultStore = new ElectricStateFactory({})

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
    case ActionTypeKeys.UI_TOGGLE_ADD_SERVER_MODAL:
      return toggleAddServerModal(state, action as IToggleAddServerModalAction)
    case ActionTypeKeys.UI_TOGGLE_SETTINGS_MODAL:
      return toggleSettingsModal(state, action as IToggleSettingsModalAction)
    default:
      return state
  }
}
