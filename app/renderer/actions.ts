import { Guid, Channel, Connection, Settings, Message } from './models'

export enum ActionTypeKeys {
  ADD_SERVER = 'ADD_SERVER',
  ADD_CONNECTION = 'ADD_CONNECTION',
  REMOVE_SERVER = 'REMOVE_SERVER',
  EDIT_SERVER = 'EDIT_SERVER',
  JOIN_CHANNEL = 'JOIN_CHANNEL',
  ADD_CHANNEL = 'ADD_CHANNEL',
  APPEND_LOG = 'APPEND_LOG',
  SEND_MESSAGE = 'SEND_MESSAGE',
  VIEW_CHANNEL = 'VIEW_CHANNEL',
  UI_TOGGLE_ADD_SERVER_MODAL = 'UI : TOGGLE_ADD_SERVER_MODAL',
  UI_TOGGLE_SETTINGS_MODAL = 'UI : TOGGLE_SETTINGS_MODAL',
  EDIT_SETTINGS = 'EDIT_SETTINGS',
  TOGGLE_TAB_SETTINGS = 'TOGGLE_TAB_SETTINGS',
  THEME_WHOLESALE = 'THEME_WHOLESALE',
  MERGE_LOGS = 'MERGE_LOGS',
  UI_TOGGLE_ADD_CHANNEL_MODAL = 'UI : TOGGLE_ADD_CHANEL_MODAL'
}
export interface IAddServerAction {
  readonly type: ActionTypeKeys.ADD_SERVER
  readonly name: string
  readonly url: string
  readonly nickname: string
  readonly channels: string[]
}

export interface IAddConnectionAction {
  readonly type: ActionTypeKeys.ADD_CONNECTION
  readonly connection: Connection
}

export interface IRemoveServerAction {
  readonly type: ActionTypeKeys.REMOVE_SERVER
  readonly id: Guid
}

export interface IEditServerAction {
  readonly type: ActionTypeKeys.EDIT_SERVER
  readonly id: Guid
  readonly name: string
  readonly url: string
}

export interface IJoinChannelAction {
  readonly type: ActionTypeKeys.JOIN_CHANNEL
  readonly serverId: Guid
  readonly channelName: string
}

export interface IAddChannelAction {
  readonly type: ActionTypeKeys.ADD_CHANNEL
  readonly serverId: Guid
  readonly channel: Channel
}

export interface IMergeLogsAction {
  readonly type: ActionTypeKeys.MERGE_LOGS
  readonly serverId: Guid
  readonly channelId: Guid
  readonly json: any[] // message property of the parsed json for list of messages from server
}
export interface IAppendLogAction {
  readonly type: ActionTypeKeys.APPEND_LOG
  readonly serverId: Guid
  readonly channelId: Guid
  readonly message: Message
}

export interface ISendMessageAction {
  readonly type: ActionTypeKeys.SEND_MESSAGE
  readonly serverId: Guid
  readonly channelId: Guid
  readonly message: string
}

export interface IViewChannelAction {
  readonly type: ActionTypeKeys.VIEW_CHANNEL
  readonly serverId: Guid
  readonly channelId: Guid
}
export interface IToggleAddServerModalAction {
  readonly type: ActionTypeKeys.UI_TOGGLE_ADD_SERVER_MODAL
  readonly visible?: boolean
}
export interface IToggleAddChannelModalAction {
  readonly type: ActionTypeKeys.UI_TOGGLE_ADD_CHANNEL_MODAL
  readonly visible?: boolean
}
export interface IToggleSettingsModalAction {
  readonly type: ActionTypeKeys.UI_TOGGLE_SETTINGS_MODAL
  readonly visible?: boolean
}
export interface IToggleTabAction {
  readonly type: ActionTypeKeys.TOGGLE_TAB_SETTINGS
  readonly tab: string
}
export interface IEditSettingsAction {
  readonly type: ActionTypeKeys.EDIT_SETTINGS
  readonly prop: string
  readonly value: any
}
export interface IThemeWholesaleAction {
  readonly type: ActionTypeKeys.THEME_WHOLESALE
  readonly themename: string
}

export type ActionTypes =
  | IAddServerAction
  | IAddConnectionAction
  | IRemoveServerAction
  | IEditServerAction
  | IJoinChannelAction
  | IAddChannelAction
  | IAppendLogAction
  | ISendMessageAction
  | IViewChannelAction
  | IToggleAddServerModalAction
  | IToggleSettingsModalAction
  | IEditSettingsAction
  | IToggleTabAction
  | IThemeWholesaleAction
  | IMergeLogsAction
  | IToggleAddChannelModalAction

export function addServer(
  name: string,
  url: string,
  nickname: string,
  channels: string[]
): IAddServerAction {
  return {
    type: ActionTypeKeys.ADD_SERVER,
    name,
    url,
    nickname,
    channels
  }
}
// export function changeNick(id: Guid, nickname: string): IChangeNickAction {
//   return {
//     type: ActionTypeKeys.CHANGE_NICK,
//     id,
//     nickname
//   }
// }
export function addConnection(connection: Connection): IAddConnectionAction {
  return {
    type: ActionTypeKeys.ADD_CONNECTION,
    connection
  }
}

export function removeServer(id: Guid): IRemoveServerAction {
  return {
    type: ActionTypeKeys.REMOVE_SERVER,
    id
  }
}

export function editServer(
  id: Guid,
  name: string,
  url: string
): IEditServerAction {
  return {
    type: ActionTypeKeys.EDIT_SERVER,
    id,
    name,
    url
  }
}

export function joinChannel(
  serverId: Guid,
  channelName: string
): IJoinChannelAction {
  return {
    type: ActionTypeKeys.JOIN_CHANNEL,
    serverId,
    channelName
  }
}

export function addChannel(
  serverId: Guid,
  channel: Channel
): IAddChannelAction {
  return {
    type: ActionTypeKeys.ADD_CHANNEL,
    serverId,
    channel
  }
}
export function mergeLog(
  serverId: Guid,
  channelId: Guid,
  json: any[]
): IMergeLogsAction {
  return {
    type: ActionTypeKeys.MERGE_LOGS,
    serverId,
    channelId,
    json
  }
}

export function appendLog(
  serverId: Guid,
  channelId: Guid,
  message: Message
): IAppendLogAction {
  return {
    type: ActionTypeKeys.APPEND_LOG,
    serverId,
    channelId,
    message
  }
}

export function sendMessage(
  serverId: Guid,
  channelId: Guid,
  message: string
): ISendMessageAction {
  return {
    type: ActionTypeKeys.SEND_MESSAGE,
    serverId,
    channelId,
    message
  }
}

export function viewChannel(
  serverId: Guid,
  channelId: Guid
): IViewChannelAction {
  return {
    type: ActionTypeKeys.VIEW_CHANNEL,
    serverId,
    channelId
  }
}

export function toggleAddServerModal(
  visible?: boolean
): IToggleAddServerModalAction {
  return {
    type: ActionTypeKeys.UI_TOGGLE_ADD_SERVER_MODAL,
    visible
  }
}
export function themeWholesale(themename: string): IThemeWholesaleAction {
  return {
    type: ActionTypeKeys.THEME_WHOLESALE,
    themename
  }
}
export function toggleAddChannelModal(
  visible?: boolean
): IToggleAddChannelModalAction {
  return {
    type: ActionTypeKeys.UI_TOGGLE_ADD_CHANNEL_MODAL,
    visible
  }
}
export function toggleSettingsModal(
  visible?: boolean
): IToggleSettingsModalAction {
  return {
    type: ActionTypeKeys.UI_TOGGLE_SETTINGS_MODAL,
    visible
  }
}
export function toggleSettingsTab(tab: string): IToggleTabAction {
  return {
    type: ActionTypeKeys.TOGGLE_TAB_SETTINGS,
    tab
  }
}
export function editSettings<K extends keyof Settings>(
  prop: K,
  value: Settings[K]
): IEditSettingsAction {
  return {
    type: ActionTypeKeys.EDIT_SETTINGS,
    prop,
    value
  }
}
