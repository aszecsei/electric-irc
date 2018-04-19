import { ipcRenderer, IpcMessageEvent } from 'electron'

import {
  READ_FILE,
  READ_FILE_COMPLETE,
  READ_FILE_ERROR,
  SAVE_FILE,
  SAVE_FILE_COMPLETE
} from '../../common/file-storage'

export function saveFile(filename: string, data: any) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(SAVE_FILE, filename, data)
    ipcRenderer.once(`${SAVE_FILE_COMPLETE}:${filename}`, () => {
      resolve()
    })
  })
}

export function readFile(filename: string) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(READ_FILE, filename)
    ipcRenderer.once(
      `${READ_FILE_ERROR}:${filename}`,
      (event: IpcMessageEvent, err: NodeJS.ErrnoException) => {
        reject(err)
      }
    )
    ipcRenderer.once(
      `${READ_FILE_COMPLETE}:${filename}`,
      (event: IpcMessageEvent, data: any) => {
        resolve(data)
      }
    )
  })
}
