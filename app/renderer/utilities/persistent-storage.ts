import { List } from 'immutable'

import { ElectricState, getSettings } from '../store'
import { SettingsFactory } from '../models'
import { IAddServerAction, addServer } from '../actions'

import * as fileStorage from './file-storage'

interface IStoredSettings {
  settings: any
  theme: string
}

export function loadSettings(
  initialState: ElectricState,
  callback: (state: ElectricState) => void
) {
  fileStorage
    .readFile('settings.ei')
    .then((data: any) => {
      callback(readSettings(initialState, data))
    })
    .catch(err => {
      // Settings did not previously exist
      writeSettings(initialState).then(() => {
        callback(initialState)
      })
    })
}

export function readSettings(
  initialState: ElectricState,
  data: IStoredSettings
) {
  let state = initialState
  const settings = new SettingsFactory(data.settings)
  state = state.set('settings', settings)
  const activeTheme = data.theme as string
  state = state.set('themeName', activeTheme)
  return state
}

export function writeSettings(state: ElectricState) {
  const settings = getSettings(state).settings.toJS()
  const theme = getSettings(state).theme
  const settingsToSave: IStoredSettings = {
    settings,
    theme
  }
  return fileStorage.saveFile('settings.ei', settingsToSave)
}

interface IStoredConnection {
  name: string
  url: string
  nickname: string
  channels: string[]
}

export function loadConnections() {
  return new Promise((resolve, reject) => {
    fileStorage
      .readFile('savedconnections.ei')
      .then((data: any) => {
        let actions = List<IAddServerAction>([])
        const connections = data as IStoredConnection[]
        connections.forEach(value => {
          actions = actions.push(
            addServer(value.name, value.url, value.nickname, value.channels)
          )
        })
        resolve(actions)
      })
      .catch((reason: any) => {
        reject(reason)
      })
  })
}

export function writeConnections(state: ElectricState) {
  const connections: IStoredConnection[] = []
  state.connections.forEach(value => {
    const newConn = {
      name: value.name,
      url: value.url,
      nickname: value.nickname,
      channels: value.channels
        .filter(channel => channel.name !== '#')
        .map(channel => channel.name)
        .toArray()
    }
    connections.push(newConn)
  })
  return fileStorage.saveFile('savedconnections.ei', connections)
}

// TODO: Load custom themes

// TODO: Load logs
