import { Guid, Channel, Connection, Settings, Message } from './models'
import { Map } from 'immutable'
import { channel } from 'redux-saga';

export enum ActionTypeKeys {
  ADD_SERVER = 'ADD_SERVER',
  MAKE_SERVER_CONNECTED = 'MAKE_SERVER_CONNECTED',
  ADD_CONNECTION = 'ADD_CONNECTION',
  REMOVE_SERVER = 'REMOVE_SERVER',
  EDIT_SERVER = 'EDIT_SERVER',
  JOIN_CHANNEL = 'JOIN_CHANNEL',
  PART_CHANNEL = 'PART_CHANNEL',
  REMOVE_CHANNEL = 'REMOVE_CHANNEL',
  ADD_CHANNEL = 'ADD_CHANNEL',
  MAKE_CHANNEL_CONNECTED = 'MAKE_CHANNEL_CONNECTED',
  APPEND_LOG = 'APPEND_LOG',
  SEND_MESSAGE = 'SEND_MESSAGE',
  VIEW_CHANNEL = 'VIEW_CHANNEL',
  UI_TOGGLE_ADD_SERVER_MODAL = 'UI : TOGGLE_ADD_SERVER_MODAL',
  UI_TOGGLE_SETTINGS_MODAL = 'UI : TOGGLE_SETTINGS_MODAL',
  EDIT_SETTINGS = 'EDIT_SETTINGS',
  TOGGLE_TAB_SETTINGS = 'TOGGLE_TAB_SETTINGS',
  THEME_WHOLESALE = 'THEME_WHOLESALE',
  PLAY_WITH_THEME = 'PLAY_WITH_THEME',
  MERGE_LOGS = 'MERGE_LOGS',
  ADD_THEME = 'ADD_THEME',
  UI_TOGGLE_ADD_CHANNEL_MODAL = 'UI : TOGGLE_ADD_CHANEL_MODAL',
}
export interface IAddServerAction {
  readonly type: ActionTypeKeys.ADD_SERVER
  readonly name: string
  readonly url: string
  readonly nickname: string
  readonly channels: string[]
}

export interface IMakeServerConnectedAction {
  readonly type: ActionTypeKeys.MAKE_SERVER_CONNECTED
  readonly serverId: Guid
}

export interface IMakeChannelConnectedAction {
  readonly type: ActionTypeKeys.MAKE_CHANNEL_CONNECTED
  readonly serverId: Guid
  readonly channelId: Guid
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
export interface IPartChannelAction {
  readonly type: ActionTypeKeys.PART_CHANNEL
  readonly serverId: Guid
  readonly channel:Channel
}
export interface IRemoveChannelAction {
  readonly type: ActionTypeKeys.REMOVE_CHANNEL
  readonly serverId: Guid
  readonly channelId: Guid
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
  readonly connid: Guid | undefined
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
  readonly prop: string|undefined
  readonly value: any
}
export interface IThemeWholesaleAction {
  readonly type: ActionTypeKeys.THEME_WHOLESALE
  readonly themename: string
}
export interface IAddThemeAction {
  readonly type: ActionTypeKeys.ADD_THEME
  readonly name: string
  readonly theme: Map<string, string>
}
export interface IPlayWithThemeAction {
  readonly type: ActionTypeKeys.PLAY_WITH_THEME
  readonly property: string
  readonly value: string
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
  | IAddThemeAction
  | IPlayWithThemeAction
  | IRemoveChannelAction

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

export function addConnection(connection: Connection): IAddConnectionAction {
  return {
    type: ActionTypeKeys.ADD_CONNECTION,
    connection
  }
}

export function makeServerConnected(serverId: Guid): IMakeServerConnectedAction {
  return {
    type: ActionTypeKeys.MAKE_SERVER_CONNECTED,
    serverId
  }
}

export function makeChannelConnected(serverId: Guid, channelId: Guid): IMakeChannelConnectedAction {
  return {
    type: ActionTypeKeys.MAKE_CHANNEL_CONNECTED,
    serverId,
    channelId
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

export function removeChannel(
  serverId: Guid,
  channelId: Guid
): IRemoveChannelAction {
  return {
    type: ActionTypeKeys.REMOVE_CHANNEL,
    serverId,
    channelId 
  }
}
export function partChannel(
  serverId: Guid,
  channelx: Channel
): IPartChannelAction {
  return {
    type: ActionTypeKeys.PART_CHANNEL,
    serverId,
    channel:channelx // some tslint fucking bullshit
  }
}

export function addChannel(
  serverId: Guid,channelx: Channel
): IAddChannelAction {
  return {
    type: ActionTypeKeys.ADD_CHANNEL,
    serverId,
    channel:channelx // some tslint fucking bullshit
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
  connid?: Guid | undefined
): IToggleAddChannelModalAction {
  return {
    type: ActionTypeKeys.UI_TOGGLE_ADD_CHANNEL_MODAL,
    connid
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
  prop: K|undefined,
  value: Settings[K]|Settings
): IEditSettingsAction {
  return {
    type: ActionTypeKeys.EDIT_SETTINGS,
    prop,
    value
  }
}
export function addTheme(
  name: string,
  theme: Map<string, string>
): IAddThemeAction {
  return {
    type: ActionTypeKeys.ADD_THEME,
    name,
    theme
  }
}
export function playWithTheme(
  property: string,
  value: string
): IPlayWithThemeAction {
  return {
    type: ActionTypeKeys.PLAY_WITH_THEME,
    property,
    value
  }
}
