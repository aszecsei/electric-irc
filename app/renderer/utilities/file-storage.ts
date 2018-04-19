import { ipcRenderer, IpcMessageEvent } from 'electron'
import { List } from 'immutable'

import { ElectricState, getSettings } from '../store'
import { SettingsFactory } from '../models'
import { IAddServerAction, addServer } from '../actions'

import {
  READ_FILE,
  READ_FILE_COMPLETE,
  SAVE_FILE,
  SAVE_FILE_COMPLETE
} from '../../common/file-storage'

export function saveFile(filename: string, data: any) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(SAVE_FILE, filename, data)
    ipcRenderer.once(
      `${SAVE_FILE_COMPLETE}:${filename}`,
      (event: IpcMessageEvent, response: any) => {
        if (response.err) {
          reject(response.err)
        } else {
          resolve()
        }
      }
    )
  })
}

export function readFile(filename: string) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(READ_FILE, filename)
    ipcRenderer.once(
      `${READ_FILE_COMPLETE}:${filename}`,
      (event: IpcMessageEvent, response: any) => {
        if (response.err) {
          reject(response.err)
        } else {
          resolve(response.data)
        }
      }
    )
  })
}

export function loadSettings(
  initialState: ElectricState,
  callback: (state: ElectricState) => void
) {
  readFile('settings.ei')
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

export function readSettings(initialState: ElectricState, data: any) {
  let state = initialState
  console.log(data.settings)
  const settings = new SettingsFactory(data.settings)
  state = state.set('settings', settings)
  const activeTheme = data.theme as string
  state = state.set('themeName', activeTheme)
  console.log('Loaded state:')
  console.log(state.toJS())
  return state
}

export function writeSettings(state: ElectricState) {
  const settings = getSettings(state).settings.toJS()
  const theme = getSettings(state).theme
  return saveFile('settings.ei', { settings, theme })
}

// TODO: Load custom themes

// TODO: Load connections

interface IStoredConnection {
  name: string
  url: string
  nickname: string
  channels: string[]
}

export function loadConnections() {
  return new Promise((resolve, reject) => {
    readFile('savedconnections.ei')
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
  return saveFile('savedconnections.ei', connections)
}

// TODO: Load logs
