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
import Swatches from 'react-color'
import SketchPicker from 'react-color/lib/components/sketch/Sketch'
import SwatchesPicker from 'react-color/lib/components/swatches/Swatches'

export class SettingsModal extends React.Component<any, any> {
  ref: any
  constructor(props: any) {
    super(props)
    this.state = {
      modal: true,
      submitted: false,
      activeTab: '1'
    }
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }
  toggletab = (tab: string) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  toggletheme = () => {
    this.ref.toggle()
  }
  public render() {
    return (
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        className={this.props.className}
        id="addmodal"
      >
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggletab('1')
              }}
            >
              Chatting
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggletab('2')
              }}
            >
              Networking
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => {
                this.toggletab('3')
              }}
            >
              Theming
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h4>Welcome to Chatting</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <h4>Networking</h4>
          </TabPane>
          <TabPane tabId="3">
            <SwatchesPicker />
          </TabPane>
        </TabContent>
      </Modal>
    )
  }
}
export default SettingsModal