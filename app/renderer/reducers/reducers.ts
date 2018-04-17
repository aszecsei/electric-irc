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
  IAddConnectionAction,
  // IChangeNickAction,
  IToggleAddServerModalAction,
  IToggleSettingsModalAction,
  IEditSettingsAction,
  IToggleTabAction,
  IAddChannelAction,
  IMergeLogsAction
} from '../actions'

import addConnection from './add-connection'
import appendLog from './append-log'
import editServer from './edit-server'
import addChannel from './add-channel'
import removeServer from './remove-server'
import viewChannel from './view-channel'
import toggleAddServerModal from './toggle-add-server-modal'
// import changeNick from './change-nick'
import toggleSettingsModal from './toggle-settings-modal'
import editSettings from './change-settings'
import toggleTab from './toggle-tab'
import mergeLog from './merge_logs'
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
    case ActionTypeKeys.ADD_CHANNEL:
      return addChannel(state, action as IAddChannelAction)
    case ActionTypeKeys.REMOVE_SERVER:
      return removeServer(state, action as IRemoveServerAction)
    case ActionTypeKeys.VIEW_CHANNEL:
      return viewChannel(state, action as IViewChannelAction)
    case ActionTypeKeys.UI_TOGGLE_ADD_SERVER_MODAL:
      return toggleAddServerModal(state, action as IToggleAddServerModalAction)
    // case ActionTypeKeys.CHANGE_NICK:
    //   return changeNick(state, action as IChangeNickAction)
    case ActionTypeKeys.MERGE_LOGS:
      return mergeLog(state, action as IMergeLogsAction)
    case ActionTypeKeys.UI_TOGGLE_SETTINGS_MODAL:
      return toggleSettingsModal(state, action as IToggleSettingsModalAction)
    case ActionTypeKeys.EDIT_SETTINGS:
      return editSettings(state, action as IEditSettingsAction)
    case ActionTypeKeys.TOGGLE_TAB_SETTINGS:
      return toggleTab(state, action as IToggleTabAction)
    default:
      return state
  }
}
