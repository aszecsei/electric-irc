import * as React from 'react'
import { Collapse } from 'reactstrap'
export class Server extends React.Component<any, any> {
  constructor(parameters: { props: any }) {
    let props = parameters.props
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = { collapse: false, icon: 'expand_more' }
  }

  toggle() {
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
          aria-controls={server.name}
          onClick={this.toggle}
        >
          {server.name}
          <i className="material-icons ml-auto">{this.state.icon}</i>
        </a>
        <Collapse isOpen={this.state.collapse}>
          <ul className="list-unstyled" id={server.name}>
            {server.channels.map((channel: string, i: number) => (
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
