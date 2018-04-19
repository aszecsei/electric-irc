import * as React from 'react'
import { remote } from 'electron'

import { Titlebar } from './titlebar'
import ThemeContainer from '../containers/theme-container'
import SidebarContainer from '../containers/sidebar-container'
import AddModalContainer from '../containers/add-modal-container'
import ChatWindowContainer from '../containers/irc-window-container'
import SettingsModalContainer from '../containers/settings-modal-container'

export const App: React.SFC = props => {
  const handleClose = (e: any) => {
    const window = remote.getCurrentWindow()
    window.close()
  }

  const handleMinimize = (e: any) => {
    const window = remote.getCurrentWindow()
    window.minimize()
  }

  const handleMaximize = (e: any) => {
    const window = remote.getCurrentWindow()
    if (!window.isMaximized()) {
      window.maximize()
    } else {
      window.unmaximize()
    }
  }

  return (
    <ThemeContainer>
      <div className="container-fluid">
        <SettingsModalContainer className="" />
        <Titlebar
          draggable={true}
          handleClose={handleClose}
          handleMinimize={handleMinimize}
          handleMaximize={handleMaximize}
        >
          Electric IRC
        </Titlebar>

        <AddModalContainer />

        <div id="content" className="flex container-fluid">
          <SidebarContainer />
          <ChatWindowContainer />
        </div>
      </div>
    </ThemeContainer>
  )
}
