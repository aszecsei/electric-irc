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
  IChangeNickAction,
  IToggleAddServerModalAction,
  IThemeWholesaleAction,
  IToggleSettingsModalAction,
  IEditSettingsAction,
  IToggleTabAction
} from '../actions'

import addConnection from './add-connection'
import appendLog from './append-log'
import editServer from './edit-server'
import joinChannel from './join-channel'
import removeServer from './remove-server'
import viewChannel from './view-channel'
import toggleAddServerModal from './toggle-add-server-modal'
import themeWholesale from './theme-wholesale'
import changeNick from './change-nick'
import toggleSettingsModal from './toggle-settings-modal'
import editSettings from './change-settings'
import toggleTab from './toggle-tab'

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
    case ActionTypeKeys.THEME_WHOLESALE:
      return themeWholesale(state, action as IThemeWholesaleAction)
    case ActionTypeKeys.CHANGE_NICK:
      return changeNick(state, action as IChangeNickAction)
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
