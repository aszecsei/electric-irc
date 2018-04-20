import * as React from 'react'
import ThemeContainer from '../containers/theme-container'
import SidebarContainer from '../containers/sidebar-container'
import AddModalContainer from '../containers/add-modal-container'
import ChatWindowContainer from '../containers/irc-window-container'
import SettingsModalContainer from '../containers/settings-modal-container'

export const App: React.SFC = props => {
  return (
    <ThemeContainer>
      <div className="container-fluid flex">
        <SettingsModalContainer className="" />
        <AddModalContainer />

        <div id="content" className="flex container-fluid">
          <SidebarContainer />
          <ChatWindowContainer />
        </div>
      </div>
    </ThemeContainer>
  )
}
