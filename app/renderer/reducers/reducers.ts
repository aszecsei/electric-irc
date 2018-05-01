import { AnyAction } from 'redux'
import { ElectricState, ElectricStateFactory } from '../store'
import {
  ActionTypeKeys,
  IAppendLogAction,
  IEditServerAction,
  IRemoveServerAction,
  IViewChannelAction,
  IAddConnectionAction,
  IToggleAddServerModalAction,
  IThemeWholesaleAction,
  IToggleSettingsModalAction,
  IEditSettingsAction,
  IToggleTabAction,
  IAddChannelAction,
  IMergeLogsAction,
  IAddThemeAction,
  IPlayWithThemeAction,
  IToggleAddChannelModalAction,
  IRemoveChannelAction
} from '../actions'
import removeChannel from './remove-channel'
import addConnection from './add-connection'
import appendLog from './append-log'
import editServer from './edit-server'
import addChannel from './add-channel'
import removeServer from './remove-server'
import viewChannel from './view-channel'
import toggleAddServerModal from './toggle-add-server-modal'

import themeWholesale from './theme-wholesale'

import toggleSettingsModal from './toggle-settings-modal'
import editSettings from './change-settings'
import toggleTab from './toggle-tab'
import mergeLog from './merge_logs'
import addTheme from './add-theme'
import playWithTheme from './play-with-theme'
import toggleAddChannelModal from './toggle-add-channel-modal'
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
    case ActionTypeKeys.REMOVE_CHANNEL:
      return removeChannel(state, action as IRemoveChannelAction)
    case ActionTypeKeys.REMOVE_SERVER:
      return removeServer(state, action as IRemoveServerAction)
    case ActionTypeKeys.VIEW_CHANNEL:
      return viewChannel(state, action as IViewChannelAction)
    case ActionTypeKeys.UI_TOGGLE_ADD_SERVER_MODAL:
      return toggleAddServerModal(state, action as IToggleAddServerModalAction)
    case ActionTypeKeys.THEME_WHOLESALE:
      return themeWholesale(state, action as IThemeWholesaleAction)
    case ActionTypeKeys.MERGE_LOGS:
      return mergeLog(state, action as IMergeLogsAction)
    case ActionTypeKeys.UI_TOGGLE_SETTINGS_MODAL:
      return toggleSettingsModal(state, action as IToggleSettingsModalAction)
    case ActionTypeKeys.EDIT_SETTINGS:
      return editSettings(state, action as IEditSettingsAction)
    case ActionTypeKeys.TOGGLE_TAB_SETTINGS:
      return toggleTab(state, action as IToggleTabAction)
    case ActionTypeKeys.ADD_THEME:
      return addTheme(state, action as IAddThemeAction)
    case ActionTypeKeys.PLAY_WITH_THEME:
      return playWithTheme(state, action as IPlayWithThemeAction)
    case ActionTypeKeys.UI_TOGGLE_ADD_CHANNEL_MODAL:
      return toggleAddChannelModal(
        state,
        action as IToggleAddChannelModalAction
      )
    default:
      return state
  }
}
