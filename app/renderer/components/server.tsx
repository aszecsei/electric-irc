import * as React from 'react'
import { Collapse } from 'reactstrap'
import { Connection } from '../models/connections'
import { Channel } from '../models/channel'
import { Guid } from '../models/guid'

interface IServerProps {
  onChannelClick: (conn: Connection, channel: Channel) => void
  connection: Connection
  curChanID: Guid | undefined
  onAddChannelClick: (connID: Guid) => void
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
  onClickAddChannel = () => {
    return (event: any) => {
      this.props.onAddChannelClick(this.props.connection.id)
    }
  }
  // this next function checks to see if the channel that this 'a' link refers to is the one selected
  // and adds a special format to the selected one so user can see that is the one selected
  // can be deleted after somthing better
  bold_if_selected(
    connection: Connection,
    channel: Channel,
    curChanID: Guid | undefined
  ) {
    if (channel.id === curChanID) {
      return (
        <a
          href="#"
          onClick={this.onClickGenerator(this.props.connection, channel)}
        >
          <b>{channel.name}</b>
        </a>
      )
    } else {
      return (
        <a
          href="#"
          onClick={this.onClickGenerator(this.props.connection, channel)}
        >
          {channel.name}
        </a>
      )
    }
  }
  getClass(channel: Channel,curChanID: Guid | undefined){
      if (channel.id === curChanID) {
          return "active";
      }
      return "";


  }

  render() {
    const server = this.props.connection
    return (
      <li>
        <a
          href={`#${server.name}`}
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
              <li key={i} className={this.getClass(channel,this.props.curChanID)}>
                {this.bold_if_selected(
                  this.props.connection,
                  channel,
                  this.props.curChanID
                )}
              </li>
            ))}
            <li>
              <a href="#" onClick={this.onClickAddChannel()}>
                Add Channel
              </a>
            </li>
          </ul>
        </Collapse>
      </li>
    )
  }
}
