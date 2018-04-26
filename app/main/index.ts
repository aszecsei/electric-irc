import { app, BrowserWindow, ipcMain, IpcMessageEvent } from 'electron'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from 'electron-devtools-installer'
import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'

import {
  SAVE_FILE,
  SAVE_FILE_COMPLETE,
  READ_FILE,
  READ_FILE_COMPLETE
} from '../common/file-storage'

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow: BrowserWindow | null

export function createMainWindow() {
  const window = new BrowserWindow({
    frame: false, // TODO: Change this once custom titlebar code works
    height: 720,
    width: 1280
  })
  const url = isDevelopment
    ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    : `file://${__dirname}/index.html`

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  window.loadURL(url)

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => {
      console.log(`Added extension: ${name}`)
    })
    .catch(err => {
      console.log(`An error occurred: ${err}`)
    })

  installExtension(REDUX_DEVTOOLS)
    .then(name => {
      console.log(`Added extension: ${name}`)
    })
    .catch(err => {
      console.log(`An error occurred: ${err}`)
    })

  return window
}

app.on('window-all-closed', () => {
  // On macOS, don't quit until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS, re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', () => {
  mainWindow = createMainWindow()
})

ipcMain.addListener('should-close', () => {
  if (mainWindow) {
    mainWindow.close()
  }
})

export function getAppFolder() {
  const home = os.homedir()
  return path.join(home, '/.electric-irc/')
}

export function getFilePath(filename: string) {
  return path.join(getAppFolder(), filename)
}

ipcMain.addListener(
  SAVE_FILE,
  (event: IpcMessageEvent, filename: string, data: any, guid: string) => {
    const filePath = getFilePath(filename)
    if (!fs.existsSync(getAppFolder())) {
      fs.mkdirSync(getAppFolder())
    }
    fs.writeFile(
      filePath,
      JSON.stringify(data),
      'utf8',
      (err: NodeJS.ErrnoException) => {
        if (err) {
          event.sender.send(`${SAVE_FILE_COMPLETE}:${filename}:${guid}`, {
            err,
            data: null
          })
        } else {
          event.sender.send(`${SAVE_FILE_COMPLETE}:${filename}:${guid}`, {
            err: null,
            data: null
          })
        }
      }
    )
  }
)

ipcMain.addListener(READ_FILE, (event: IpcMessageEvent, filename: string, guid: string) => {
  const filePath = getFilePath(filename)
  fs.readFile(filePath, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
    if (err) {
      event.sender.send(`${READ_FILE_COMPLETE}:${filename}:${guid}`, {
        err,
        data: null
      })
    } else {
      event.sender.send(`${READ_FILE_COMPLETE}:${filename}:${guid}`, {
        err: null,
        data: JSON.parse(data)
      })
    }
  })
})
