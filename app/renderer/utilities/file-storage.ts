import { ipcRenderer, IpcMessageEvent } from 'electron'

import {
  READ_FILE,
  READ_FILE_COMPLETE,
  SAVE_FILE,
  SAVE_FILE_COMPLETE
} from '../../common/file-storage'
import { Guid } from '../models';

export function saveFile(filename: string, data: any) {
  return new Promise((resolve, reject) => {
    const saveGuid = Guid.create().toString()
    ipcRenderer.send(SAVE_FILE, filename, data, saveGuid)
    ipcRenderer.once(
      `${SAVE_FILE_COMPLETE}:${filename}:${saveGuid}`,
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
    const readGuid = Guid.create().toString()
    ipcRenderer.send(READ_FILE, filename, readGuid)
    ipcRenderer.once(
      `${READ_FILE_COMPLETE}:${filename}:${readGuid}`,
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
