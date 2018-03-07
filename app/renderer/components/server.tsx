import * as React from 'react'
import { Collapse } from 'reactstrap'
import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
import * as irc from 'irc'

interface IServerProps {
  onChannelClick: (conn: Connection, channel: Channel) => void
  connection: Connection
}

interface IServerState {
  collapse: boolean
  icon: string
}

export class Server extends React.Component<IServerProps, IServerState> {
  constructor(props: IServerProps) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      collapse: false,
      icon: 'expand_more'
    }
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse })
    if (this.state.icon === 'expand_more') {
      this.setState({ icon: 'expand_less' })
    } else {
      this.setState({ icon: 'expand_more' })
    }
  }

  onClickGenerator = (client: Connection, channel: Channel) => {
    return (event: any) => {
      this.props.onChannelClick(client, channel)
    }
  }

  render() {
    const server = this.props.connection
    return (
      <li>
        <a
          href="#{server.name}"
          role="button"
          aria-controls={this.props.connection.name}
          onClick={this.toggle}
        >
          {this.props.connection.name}
          <i className="material-icons ml-auto">{this.state.icon}</i>
        </a>
        <Collapse isOpen={this.state.collapse}>
          <ul className="list-unstyled" id={server.name}>
            {this.props.connection.channels.map((channel, i) => (
              <li key={i}>
                <a
                  href="#"
                  onClick={this.onClickGenerator(
                    this.props.connection,
                    channel
                  )}
                >
                  {channel}
                </a>
              </li>
            ))}
          </ul>
        </Collapse>
      </li>
    )
  }
}
