import * as React from 'react'
import * as classNames from 'classnames'

export interface ITitlebarProps {
  handleClose?(event: any): void;
  handleMinimize?(event: any): void;
  handleMaximize?(event: any): void;
  draggable?: boolean;
}

export class Titlebar extends React.Component<ITitlebarProps, any> {
  constructor(props: ITitlebarProps) {
    super(props);
    this.state = {draggable: this.props.draggable}
  }

  // prevent event
  handleNop(e: any) {
    e.preventDefault()
    e.stopPropagation()
  }

  public render() {
    let classes = classNames('titlebar',
    {
      'webkit-draggable': this.state.draggable
    });
    return (
      <div className={classes} id="titlebar">
        <div className="titlebar-stoplight">
          <div onDoubleClick={this.handleNop} onClick={this.props.handleClose} className="titlebar-close">
            {/* TODO: Fix this styling <i className="material-icons">close</i> */}
          </div>
          <div onDoubleClick={this.handleNop} onClick={this.props.handleMinimize} className="titlebar-minimize"></div>
          <div onDoubleClick={this.handleNop} onClick={this.props.handleMaximize} className="titlebar-maximize"></div>
        </div>
        <div className="titlebar-children">
          {this.props.children}
        </div>
      </div>
    )
  }
}