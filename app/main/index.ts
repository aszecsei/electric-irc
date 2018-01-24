import { app, BrowserWindow } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow: BrowserWindow | null

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false // TODO: Change this once custom titlebar code works
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

  installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
    console.log(`Added extension: ${name}`)
  })
  .catch((err) => {
    console.log(`An error occurred: ${err}`)
  })

  return window
}

app.on('window-all-closed', () => {
  // On macOS, don't quit until the user explicitly quits
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On macOS, re-create a window even after all windows have been closed
  if (mainWindow === null) mainWindow = createMainWindow()
})

app.on('ready', () => {
  mainWindow = createMainWindow()
})