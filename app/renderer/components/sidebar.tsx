import * as React from 'react'
import { Server } from './server'
import * as irc from 'irc'
import { Client } from '../models/client'

interface ISidebarProps {
  onClicked?: (client: irc.Client, channel: string) => void
}

interface ISidebarState {
  clientList: Client[]
}

export class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  constructor(props: ISidebarProps) {
    super(props)
    this.state = {
      clientList: []
    }
    // TODO: Uncommenting this works for manual testing, but makes Mocha hang
    // Hopefully we can remove it once adding a server works
    // this.autoConnect()
  }

  onServerClick = (client: irc.Client, channel: string) => {
    if (this.props.onClicked) {
      this.props.onClicked(client, channel)
    }
  }

  autoConnect = () => {
    let c = new Client(
      'Freenode',
      new irc.Client('irc.freenode.net', 'eIRCClient', {
        channels: ['#electric-irc']
      })
    )

    this.state.clientList.push(c)
  }

  public render() {
    const test = [{ name: 'test', channels: ['test1', 'test2', 'test3'] }]
    return (
      <nav className="flex" id="sidebar">
        <div className="sidebar-header">
          <h3>Electric IRC: Welcome Home</h3>
        </div>

        <ul className="list-unstyled components">
          <li className="active">
            <a href="#">Home</a>
          </li>
          {this.state.clientList.map((client, i) => (
            <Server key={i} onClicked={this.onServerClick} server={client} />
          ))}

          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </nav>
    )
  }
}
