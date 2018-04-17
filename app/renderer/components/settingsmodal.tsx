import * as React from 'react'
import {
  TabContent,
  Nav,
  NavItem,
  NavLink,
  Modal,
  TabPane,
  Row,
  Col,
  Input,
  FormGroup,
  Label
} from 'reactstrap'
import * as classnames from 'classnames'
import { ISettings, Settings } from '../models/settings'

interface ISettingsProps {
  visible: boolean
  onSettingsToggle: () => void
  onTabToggle: (arg: string) => void
  changeSetting: (event: keyof ISettings, value: any) => void
  toggleTab: string
  className: string
  settings: Settings
}

export class SettingsModal extends React.Component<ISettingsProps> {
  constructor(props: ISettingsProps) {
    super(props)
  }
  toggletab = (tab: string) => {
    this.props.onTabToggle(tab)
  }
  toggleScrollback = (event: any) => {
    this.props.changeSetting('scrollback', !this.props.settings.scrollback)
    console.log(this.props.settings.scrollback)
  }
  setScrollback = (event: any) => {
    this.props.changeSetting('scrollbackLines', event.target.value)
  }
  toggleTimestamps = (event: any) => {
    this.props.changeSetting('timestamps', !this.props.settings.timestamps)
  }
  setTimestamps = (event: any) => {
    this.props.changeSetting('timeformat', event.target.value)
  }
  toggleMarkAway = (event: any) => {
    this.props.changeSetting('autoaway', !this.props.settings.autoaway)
  }
  setQuitMessage = (event: any) => {
    this.props.changeSetting('defquit', event.target.value)
  }
  setLeaveMessage = (event: any) => {
    this.props.changeSetting('defleave', event.target.value)
  }
  setAwayMessage = (event: any) => {
    this.props.changeSetting('defaway', event.target.value)
  }
  toggleHideJoinMessage = (event: any) => {
    this.props.changeSetting('hidejoin', !this.props.settings.hidejoin)
  }
  toggleHideNickChangeMessage = (event: any) => {
    this.props.changeSetting(
      'hidenicknamechange',
      !this.props.settings.hidenicknamechange
    )
  }
  toggleUrlGrabber = (event: any) => {
    this.props.changeSetting('urlgrabber', !this.props.settings.urlgrabber)
  }
  setMaxUrl = (event: any) => {
    this.props.changeSetting('maxurl', event.target.value)
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
              className={classnames({ active: this.props.toggleTab === '1' })}
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
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={this.props.settings.scrollback}
                      onChange={this.toggleScrollback}
                    />
                    Enable Scrollback
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    <Input
                      type="number"
                      disabled={!this.props.settings.scrollback}
                      value={this.props.settings.scrollbackLines}
                      onChange={this.setScrollback}
                    />
                    Scrollback lines
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={this.props.settings.timestamps}
                      onChange={this.toggleTimestamps}
                    />
                    Enable TimeStamps
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    <Input
                      type="text"
                      disabled={!this.props.settings.timestamps}
                      value={this.props.settings.timeformat}
                      onChange={this.setTimestamps}
                    />
                    Time Format
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={this.props.settings.autoaway}
                      onChange={this.toggleMarkAway}
                    />
                    Automatically mark away
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    <Input
                      type="text"
                      value={this.props.settings.defquit}
                      onChange={this.setQuitMessage}
                    />
                    Default Quit Message
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    <Input
                      type="text"
                      value={this.props.settings.defleave}
                      onChange={this.setLeaveMessage}
                    />
                    Default Leave Message
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    <Input
                      type="text"
                      value={this.props.settings.defaway}
                      onChange={this.setAwayMessage}
                    />
                    Default Away Message
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={this.props.settings.hidejoin}
                      onChange={this.toggleHideJoinMessage}
                    />
                    Hide Join Messages
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={this.props.settings.hidenicknamechange}
                      onChange={this.toggleHideNickChangeMessage}
                    />
                    Hide Nickname Change Messages
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <h4>Networking</h4>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={this.props.settings.urlgrabber}
                  onChange={this.toggleUrlGrabber}
                />
                Enable URL Grabber
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <Input
                  type="number"
                  disabled={!this.props.settings.urlgrabber}
                  value={this.props.settings.maxurl}
                  onChange={this.setMaxUrl}
                />
                Maximum URL size
              </Label>
            </FormGroup>
          </TabPane>
          <TabPane tabId="3" />
        </TabContent>
      </Modal>
    )
  }
}
export default SettingsModal
