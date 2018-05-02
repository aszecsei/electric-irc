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
  onPartChannelClick: (connID: Guid,chan:Channel) => void
  onQuitServerClick: (connID: Guid) => void
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
  onClickPartChannel = (channel:Channel) => {
    return (event: any) => {
      this.props.onPartChannelClick(this.props.connection.id,channel)
    }
  }
  onClickQuitServer = () => {
    return (event: any) => {
      this.props.onQuitServerClick(this.props.connection.id)
    }
  }
  // this next function checks to see if the channel that this 'a' link refers to is the one selected
  // and adds a special format to the selected one so user can see that is the one selected
  // can be deleted after somthing better
  bold_if_selected(
    channel: Channel,
    curChanID: Guid | undefined
  ) {
      return (channel.id === curChanID?<b>{channel.name}</b>:channel.name)
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
                <div className={"row"}>
                    <a href="#" className="exa" onClick={channel.name !== "#"?this.onClickPartChannel(channel):this.onClickQuitServer()}>{channel.name !== "#"?"✖":"❌"}</a>
                        <a
                            href="#"
                            onClick={this.onClickGenerator(this.props.connection, channel)}
                            className={"exreg"}
                        >
                            {this.bold_if_selected(
                                channel,
                                this.props.curChanID
                            )}
                        </a>
                </div>

              </li>
            ))}
            <li>
              <a href="#" onClick={this.onClickAddChannel()}>
                ✚Add Channel
              </a>
            </li>
          </ul>
        </Collapse>
      </li>
    )
  }
}
