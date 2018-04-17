import * as React from 'react'
import * as classNames from 'classnames'

export interface ITitlebarProps {
  draggable?: boolean
  handleClose?(event: any): void
  handleMinimize?(event: any): void
  handleMaximize?(event: any): void
}

export class Titlebar extends React.Component<ITitlebarProps, any> {
  constructor(props: ITitlebarProps) {
    super(props)
    this.state = { draggable: this.props.draggable }
  }

  // prevent event
  handleNop(e: any) {
    e.preventDefault()
    e.stopPropagation()
  }

  public render() {
    const classes = classNames('titlebar', {
      'webkit-draggable': this.state.draggable
    })
    return (
      <div className={classes} id="titlebar">
        <img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/32/519878-87_Lightning-32.png" />
        <div className="titlebar-stoplight">
          <div
            onDoubleClick={this.handleNop}
            onClick={this.props.handleMinimize}
            className="titlebar-minimize"
          />
          <div
            onDoubleClick={this.handleNop}
            onClick={this.props.handleMaximize}
            className="titlebar-maximize"
          >
            {/* TODO: Fix this styling <i className="material-icons">close</i> */}
          </div>
          <div
            onDoubleClick={this.handleNop}
            onClick={this.props.handleClose}
            className="titlebar-close"
          />
        </div>
        <div className="titlebar-children">{this.props.children}</div>
      </div>
    )
  }
}
