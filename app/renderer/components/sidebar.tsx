import { List } from 'immutable'
import * as React from 'react'
import { Server } from './server'
import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
import { Guid } from '../models/guid'

interface ISidebarProps {
  connections: List<Connection>
  curChanID: Guid | undefined
  onChannelClick: (conn: Connection, channel: Channel) => void
  onAddChannelClick: () => void
  onAddServerClick: () => void
  onSettingsClick: () => void
}

export const Sidebar: React.SFC<ISidebarProps> = props => {
  return (
    <nav className="flex" id="sidebar">
      <div className="sidebar-header">
        <h3>Electric IRC: Welcome Home</h3>
      </div>

      <ul className="list-unstyled components">
        <li>
          <a href="#" onClick={props.onAddServerClick}>
            Add Server
          </a>
        </li>
        {props.connections.map((connection, i) => (
          <Server
            key={i}
            connection={connection}
            onChannelClick={props.onChannelClick}
            curChanID={props.curChanID}
            onAddChannelClick={props.onAddChannelClick}
          />
        ))}
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#" onClick={props.onSettingsClick}>
            Settings
          </a>
        </li>
      </ul>
    </nav>
  )
}
