import { ElectricState, getSettings } from '../store'
import { Settings, SettingsFactory } from '../models'
import * as fileStorage from './file-storage'

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
  return fileStorage.saveFile('settings.ei', { settings, theme })
}
