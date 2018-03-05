import * as React from 'react'
import { Server } from './server'
import * as irc from 'irc'
import { ConnectionHandler } from '../models/connections'

interface ISidebarProps {
  onClicked?: (client: irc.Client, channel: string) => void
}

export class Sidebar extends React.Component<ISidebarProps, any> {
  constructor(props: ISidebarProps) {
    super(props)
  }

  onServerClick = (client: irc.Client, channel: string) => {
    if (this.props.onClicked) {
      this.props.onClicked(client, channel)
    }
  }

  public render() {
    return (
      <nav className="flex" id="sidebar">
        <div className="sidebar-header">
          <h3>Electric IRC: Welcome Home</h3>
        </div>

        <ul className="list-unstyled components">
          <li className="active">
            <a href="#">Home</a>
          </li>
          {ConnectionHandler.connections.map(
            (connection, i) =>
              connection.client ? (
                <Server
                  key={i}
                  onClicked={this.onServerClick}
                  server={connection.client}
                />
              ) : (
                <div />
              )
          )}
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </nav>
    )
  }
}
