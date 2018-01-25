// TODO: This doesn't currently work to load the app - NEED TO FIX
// This is for end-to-end testing; any react components can be tested with enzyme alone.

import * as spectron from 'spectron'
import * as path from 'path'

export function initializeSpectron() {
  let electronPath = path.join(__dirname, '../node_modules', '.bin', 'electron')
  const appPath = path.join(__dirname, '../dist')
  if (process.platform === 'win32') {
    electronPath += '.cmd'
  }

  return new spectron.Application({
    path: electronPath,
    args: [appPath],
    env: {
      ELECTRON_ENABLE_LOGGING: true,
      ELECTRON_ENABLE_STACK_DUMPING: true,
      NODE_ENV: 'development'
    },
    startTimeout: 20000,
    chromeDriverLogPath: './chromedriverlog.txt'
  })
}

export default initializeSpectron
