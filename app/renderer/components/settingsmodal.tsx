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
  Input
} from 'reactstrap'
import * as classnames from 'classnames'
import { ISettings, Settings } from '../models/settings'
import FormGroup from 'reactstrap/lib/FormGroup'
import Label from 'reactstrap/lib/Label'

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
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={this.props.settings.scrollback}
                      onChange={() =>
                        this.props.changeSetting(
                          'scrollback',
                          !this.props.settings.scrollback
                        )
                      }
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
                      onChange={event =>
                        this.props.changeSetting(
                          'scrollbackLines',
                          event.target.value
                        )
                      }
                    />
                    Scrollback lines
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={this.props.settings.timestamps}
                      onChange={() =>
                        this.props.changeSetting(
                          'timestamps',
                          !this.props.settings.timestamps
                        )
                      }
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
                      onChange={event =>
                        this.props.changeSetting(
                          'timeformat',
                          event.target.value
                        )
                      }
                    />
                    Time Format
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={this.props.settings.autoaway}
                      onChange={() =>
                        this.props.changeSetting(
                          'autoaway',
                          !this.props.settings.autoaway
                        )
                      }
                    />
                    Automatically mark away
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    <Input
                      type="text"
                      value={this.props.settings.defquit}
                      onChange={event =>
                        this.props.changeSetting('defquit', event.target.value)
                      }
                    />
                    Default Quit Message
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    <Input
                      type="text"
                      value={this.props.settings.defleave}
                      onChange={event =>
                        this.props.changeSetting('defleave', event.target.value)
                      }
                    />
                    Default Leave Message
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    <Input
                      type="text"
                      value={this.props.settings.defaway}
                      onChange={event =>
                        this.props.changeSetting('defaway', event.target.value)
                      }
                    />
                    Default Away Message
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={this.props.settings.hidejoin}
                      onChange={() =>
                        this.props.changeSetting(
                          'hidejoin',
                          !this.props.settings.hidejoin
                        )
                      }
                    />
                    Hide Join Messages
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={this.props.settings.hidenicknamechange}
                      onChange={() =>
                        this.props.changeSetting(
                          'hidenicknamechange',
                          !this.props.settings.hidenicknamechange
                        )
                      }
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
                  onChange={() =>
                    this.props.changeSetting(
                      'timestamps',
                      !this.props.settings.urlgrabber
                    )
                  }
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
                  onChange={event =>
                    this.props.changeSetting('maxurl', event.target.value)
                  }
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
