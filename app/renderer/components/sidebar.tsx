import * as React from 'react'

export class Sidebar extends React.Component<any, any> {
  public render() {
    return (
      <div className="wrapper col-2 flex row">
        <nav id="sidebar">
          <div className="sidebar-header">
            <h3>Collapsible Sidebar</h3>
          </div>

          <ul className="list-unstyled components">
            <li className="active">
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a
                href="#homeSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
              >
                Pages
              </a>
              <ul className="collapse list-unstyled" id="homeSubmenu">
                <li>
                  <a href="#">Page</a>
                </li>
                <li>
                  <a href="#">Page</a>
                </li>
                <li>
                  <a href="#">Page</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Portfolio</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
