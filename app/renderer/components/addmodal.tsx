import * as React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'
import { List } from 'immutable'

interface IAddModalProps {
  visible: boolean
  onAddServerToggle: () => void
  onAddServerSubmit: (
    serverName: string,
    serverURL: string,
    nickname: string,
    channels: string[]
  ) => void
}

interface IAddModalState {
  name: string
  url: string
  nickname: string
  channels: List<string>
}

const defaultState = {
  name: 'Freenode',
  url: 'chat.freenode.net',
  nickname: 'Guest',
  channels: List([])
}

export class AddModal extends React.Component<IAddModalProps, IAddModalState> {
  constructor(props: IAddModalProps) {
    super(props)
    this.state = { ...defaultState }
  }
  handleChangeName = (event: any) => {
    if (
      event.target.value.match(
        '[a-z_\\-\\[\\]\\\\^{}|`][a-z0-9_\\-\\[\\]\\\\^{}|`]{2,15}'
      )
    ) {
      this.setState({
        nickname: event.target.value
      })
      event.target.classList.add('is-valid')
      event.target.classList.remove('is-invalid')
    } else {
      this.setState({
        nickname: event.target.value
      })
      event.target.classList.add('is-invalid')
      event.target.classList.remove('is-valid')
    }
  }
  handleChangeIRC = (event: any) => {
    this.setState({
      url: event.target.value
    })
  }
  handleChangeIRCName = (event: any) => {
    this.setState({
      name: event.target.value
    })
  }
  handleAddChannel = (event: any) => {
    this.setState({
      channels: this.state.channels.push('')
    })
  }

  generateHandleChangeChannel = (index: number) => {
    return (event: any) => {
      this.setState({
        channels: this.state.channels.set(index, event.target.value)
      })
    }
  }
  generateHandleDeleteChannel = (index: number) => {
    return (event: any) => {
      this.setState({
        channels: this.state.channels.remove(index)
      })
    }
  }

  handleSubmit = (event: any) => {
    this.props.onAddServerSubmit(
      this.state.name,
      this.state.url,
      this.state.nickname,
      this.state.channels.toArray()
    )
    this.setState({ ...defaultState })
    event.preventDefault()
    this.props.onAddServerToggle()
  }
  public render() {
    return (
      <Modal
        isOpen={this.props.visible}
        toggle={this.props.onAddServerToggle}
        id="addmodal"
      >
        <Form onSubmit={this.handleSubmit}>
          <ModalHeader toggle={this.props.onAddServerToggle}>
            Add new server
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="Name">Server Name:</Label>
              <Input
                className={'IRCName'}
                type="text"
                value={this.state.name}
                onChange={this.handleChangeIRCName}
                name="Name"
                id="Name"
                placeholder="Server Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="IRC">IRC name:</Label>
              <Input
                className={'IRC'}
                type="text"
                value={this.state.url}
                onChange={this.handleChangeIRC}
                name="IRC"
                id="IRC"
                placeholder="IRC"
              />
            </FormGroup>
            <FormGroup>
              <Label for="Nickname">Nickname:</Label>
              <Input
                className={'Nickname'}
                type="text"
                value={this.state.nickname}
                onChange={this.handleChangeName}
                name="Nickname"
                id="Nickname"
                placeholder="Nickname"
              />
            </FormGroup>
            {this.state.channels
              .map((channel, index) => {
                return (
                  <FormGroup key={index}>
                    <InputGroup>
                      <Input
                        className={'Channel'}
                        type="text"
                        value={this.state.channels.get(index)}
                        onChange={this.generateHandleChangeChannel(index)}
                        name={`channel${index}`}
                        id={`channel${index}`}
                        placeholder={'#'}
                      />
                      <InputGroupAddon addonType="append">
                        <Button
                          color="danger"
                          onClick={this.generateHandleDeleteChannel(index)}
                        >
                          Delete
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                )
              })
              .toArray()}
            <Button color="secondary" onClick={this.handleAddChannel}>
              Add Channel
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Add
            </Button>{' '}
            <Button
              color="secondary"
              type="button"
              onClick={this.props.onAddServerToggle}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}
export default AddModal
