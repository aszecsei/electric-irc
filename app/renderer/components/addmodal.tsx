import * as classNames from 'classnames'
import * as React from 'react'

export class AddModal extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { draggable: this.props.draggable }
  }

  public render() {
    return <div />
  }
}
export default AddModal
