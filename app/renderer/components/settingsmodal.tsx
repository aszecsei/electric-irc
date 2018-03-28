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
import * as classnames from 'classnames'
import { Settings } from '../models/settings'
const defaultState = {
  activeTab: '1'
}
interface ISettingsProps {
  visible: boolean
  onSettingsToggle: () => void
  onTabToggle: (arg: string) => void
  toggleTab: string
  className: string
  settings: Settings
}

export class SettingsModal extends React.Component<ISettingsProps, any> {
  constructor(props: ISettingsProps) {
    super(props)
    this.state = { ...defaultState }
  }
  toggletab = (tab: string) => {
    this.props.onTabToggle(tab)
  }

  public render() {
    return (
      <Modal
        isOpen={this.props.visible}
        toggle={this.props.onSettingsToggle}
        className={this.props.className}
        id="addmodal"
      >
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.props.toggleTab == '1' })}
              onClick={() => {
                this.toggletab('1')
              }}
            >
              Chatting
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.props.toggleTab === '2' })}
              onClick={() => {
                this.toggletab('2')
              }}
            >
              Networking
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.props.toggleTab === '3' })}
              onClick={() => {
                this.toggletab('3')
              }}
            >
              Theming
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.props.toggleTab}>
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
          <TabPane tabId="3" />
        </TabContent>
      </Modal>
    )
  }
}
export default SettingsModal
