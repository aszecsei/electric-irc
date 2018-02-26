import * as React from 'react'
import { Collapse } from 'reactstrap'
import { Client } from '../models/client'
import * as irc from 'irc'

interface IServerProps {
  onClicked: (client: irc.Client, channel: string) => void
  server: Client
}

interface IServerState {
  channelList: string[]
  collapse: boolean
  icon: string
}

export class Server extends React.Component<IServerProps, IServerState> {
  constructor(props: IServerProps) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      collapse: false,
      icon: 'expand_more',
      channelList: ['#electric-irc']
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

  render() {
    const server = this.props.server
    return (
      <li>
        <a
          href="#{server.name}"
          role="button"
          aria-controls={this.props.server.name}
          onClick={this.toggle}
        >
          {this.props.server.name}
          <i className="material-icons ml-auto">{this.state.icon}</i>
        </a>
        <Collapse isOpen={this.state.collapse}>
          <ul className="list-unstyled" id={server.name}>
            {this.state.channelList.map((channel: string, i: number) => (
              <li key={i}>
                <a href={i.toString()}>{channel}</a>
              </li>
            ))}
          </ul>
        </Collapse>
      </li>
    )
  }
}
