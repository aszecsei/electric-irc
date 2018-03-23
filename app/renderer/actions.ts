import { Message } from './models/message'
import { Connection } from './models/connections'

export enum ActionTypeKeys {
  ADD_SERVER = 'ADD_SERVER',
  ADD_CONNECTION = 'ADD_CONNECTION',
  REMOVE_SERVER = 'REMOVE_SERVER',
  EDIT_SERVER = 'EDIT_SERVER',
  JOIN_CHANNEL = 'JOIN_CHANNEL',
  APPEND_LOG = 'APPEND_LOG',
  SEND_MESSAGE = 'SEND_MESSAGE',
  VIEW_CHANNEL = 'VIEW_CHANNEL',
  UI_TOGGLE_ADD_SERVER_MODAL = 'UI : TOGGLE_ADD_SERVER_MODAL'
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
  readonly id: number
}

export interface IEditServerAction {
  readonly type: ActionTypeKeys.EDIT_SERVER
  readonly id: number
  readonly name: string
  readonly url: string
}

export interface IJoinChannelAction {
  readonly type: ActionTypeKeys.JOIN_CHANNEL
  readonly serverId: number
  readonly channel: string
}

export interface IAppendLogAction {
  readonly type: ActionTypeKeys.APPEND_LOG
  readonly serverId: number
  readonly channelId: number
  readonly message: Message
}

export interface ISendMessageAction {
  readonly type: ActionTypeKeys.SEND_MESSAGE
  readonly serverId: number
  readonly channelId: number
  readonly message: Message
}

export interface IViewChannelAction {
  readonly type: ActionTypeKeys.VIEW_CHANNEL
  readonly serverId: number
  readonly channelId: number
}

export interface IToggleAddServerModalAction {
  readonly type: ActionTypeKeys.UI_TOGGLE_ADD_SERVER_MODAL
  readonly visible?: boolean
}

export type ActionTypes =
  | IAddServerAction
  | IAddConnectionAction
  | IRemoveServerAction
  | IEditServerAction
  | IJoinChannelAction
  | IAppendLogAction
  | ISendMessageAction
  | IViewChannelAction
  | IToggleAddServerModalAction

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

export function removeServer(id: number): IRemoveServerAction {
  return {
    type: ActionTypeKeys.REMOVE_SERVER,
    id
  }
}

export function editServer(
  id: number,
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
  serverId: number,
  channel: string
): IJoinChannelAction {
  return {
    type: ActionTypeKeys.JOIN_CHANNEL,
    serverId,
    channel
  }
}

export function appendLog(
  serverId: number,
  channelId: number,
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
  serverId: number,
  channelId: number,
  message: Message
): ISendMessageAction {
  return {
    type: ActionTypeKeys.SEND_MESSAGE,
    serverId,
    channelId,
    message
  }
}

export function viewChannel(
  serverId: number,
  channelId: number
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
