import * as React from 'react'
import {
  TabContent,
  Nav,
  NavItem,
  NavLink,
  Modal,
  TabPane,
  Row,
  Col
} from 'reactstrap'
import classnames from 'classnames'

export class ThemeModal extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      modal: false,
      submitted: false
    }
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  public render() {
    return (
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        className={this.props.className}
        id="addmodal"
      />
    )
  }
}
export default ThemeModal
