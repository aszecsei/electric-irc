import * as React from 'react'
export class Sidebar extends React.Component<any, any> {
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
          <li>
            <a
              href="#IRC1"
              data-toggle="collapse"
              aria-expanded="false"
              role="button"
              aria-controls="IRC1"
            >
              IRC 1
              <i className="material-icons ml-auto">expand_more</i>
            </a>
            <ul className="collapse list-unstyled" id="IRC1">
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
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="">
              IRC 2
              <i className="material-icons ml-auto">expand_more</i>
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
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">
              IRC 3
              <i className="material-icons ml-auto">expand_more</i>
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
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">
              IRC 4
              <i className="material-icons ml-auto">expand_more</i>
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
            <a href="#">About</a>
          </li>
        </ul>
      </nav>
    )
  }
}
