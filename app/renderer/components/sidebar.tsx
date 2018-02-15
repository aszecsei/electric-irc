import * as React from 'react'
import { Server } from './server'

export class Sidebar extends React.Component<any, any> {
  constructor(parameters: { props: any }) {
    let props = parameters.props
    super(props)
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
          {test.map((server, i) => <Server key={i} server={server} />)}

          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </nav>
    )
  }
}
