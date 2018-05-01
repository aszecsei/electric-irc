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
import { ISettings, Settings, SettingsFactory } from '../models/settings'
import { Map } from 'immutable'
import Button from 'reactstrap/lib/Button'
import { CompactPicker } from 'react-color'

interface ISettingsProps {
  visible: boolean
  onSettingsToggle: () => void
  onTabToggle: (arg: string) => void
  changeSetting: (event: keyof ISettings|undefined, value: any) => void
  addTheme: (name: string, theme: Map<string, string>) => void
  toggleTab: string
  className: string
  settings: Settings
  changeTheme: (theme: string) => void
  currentTheme: string
  themes: Map<string, Map<string, string>>
  thistheme: Map<string, string>
  playWithTheme: (property: string, color: string) => void
}

export class SettingsModal extends React.Component<ISettingsProps, any> {
  constructor(props: ISettingsProps) {
    super(props)
    this.state = {
      propertyvalue: 'background',
      themename: 'Custom'
    }
  }
  savetheme = () => {
    this.props.addTheme(this.state.themename, this.props.thistheme)
  }
  toggletab = (tab: string) => {
    this.props.onTabToggle(tab)
  }
  toggleScrollback = (event: any) => {
    this.props.changeSetting('scrollback', !this.props.settings.scrollback)
    // console.log(this.props.settings.scrollback)
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
  toggleReset = (event: any) => {
    this.props.changeSetting(undefined, SettingsFactory())
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
  playWithTheme= (color:any)=>{
      this.props.playWithTheme(this.state.propertyvalue, color.hex)
  }
  toggleUrlGrabber = (event: any) => {
    this.props.changeSetting('urlgrabber', !this.props.settings.urlgrabber)
  }
  setMaxUrl = (event: any) => {
    this.props.changeSetting('maxurl', event.target.value)
  }
  changeTheme = (event: any) => {
    this.props.changeTheme(event.target.value)
  }
  handleChangeProperty = (e: any) => {
    this.setState({ propertyvalue: e.target.value })
  }
  handleChangeTheme = (e: any) => {
    this.setState({ themename: e.target.value })
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
                      disabled
                    />
                    Enable Scrollback
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    <Input
                      type="number"
                      // disabled={!this.props.settings.scrollback}
                      value={this.props.settings.scrollbackLines}
                      onChange={this.setScrollback}
                      disabled
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
                      disabled
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
                      disabled
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
                <FormGroup>
                    <Input
                      type="button"
                      id="chatSettingsReset"
                      value={"Reset"}
                      onClick={this.toggleReset}
                    />
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
                  disabled
                />
                Enable URL Grabber
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <Input
                  type="number"
                  // disabled={!this.props.settings.urlgrabber}
                  value={this.props.settings.maxurl}
                  onChange={this.setMaxUrl}
                  disabled
                />
                Maximum URL size
              </Label>
            </FormGroup>
          </TabPane>
          <TabPane tabId="3">
            <Input
              type="select"
              name="themeselect"
              id="themeselect"
              value={this.props.currentTheme}
              onChange={this.changeTheme}
            >
              {this.props.themes.keySeq().map((key: string) => (
                <option value={key} key={key}>
                  {key}
                </option>
              ))}
            </Input>
            <p>Custom Theme</p>
            Theme Name:
            <Input
              type={'text'}
              value={this.state.themename}
              onChange={this.handleChangeTheme}
            />
            <Input
              type={'select'}
              value={this.state.propertyvalue}
              name="themechange"
              id="themechange"
              onChange={this.handleChangeProperty}
            >
              <option value="background">Background</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="text">Text</option>
            </Input>
            <CompactPicker
                onChangeComplete ={color =>
                this.playWithTheme(color)
              }
            />
            <Button onClick={() => this.savetheme()}> Save Theme</Button>
          </TabPane>
        </TabContent>
      </Modal>
    )
  }
}
export default SettingsModal
