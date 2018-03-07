import { List } from 'immutable'
import * as React from 'react'
import { Server } from './server'
import { Connection } from '../models/connections'
import { Channel } from '../models/channel'

interface ISidebarProps {
  connections: List<Connection>
  onChannelClick: (conn: Connection, channel: Channel) => void
}

export const Sidebar: React.SFC<ISidebarProps> = props => {
  return (
    <nav className="flex" id="sidebar">
      <div className="sidebar-header">
        <h3>Electric IRC: Welcome Home</h3>
      </div>

      <ul className="list-unstyled components">
        <li className="active">
          <a href="#">Home</a>
        </li>
        {props.connections.map((connection, i) => (
          <Server
            key={i}
            connection={connection}
            onChannelClick={props.onChannelClick}
          />
        ))}
        <li>
          <a href="#">About</a>
        </li>
      </ul>
    </nav>
  )
}
