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

interface IAddChannelModalProps {
  visible: boolean
  onAddChannelToggle: () => void
  onAddChannelSubmit: (channels: string[]) => void
}

interface IAddChannelModalState {
  channels: List<string>
}

const defaultState = {
  channels: List([])
}

export class AddChannelModal extends React.Component<
  IAddChannelModalProps,
  IAddChannelModalState
> {
  constructor(props: IAddChannelModalProps) {
    super(props)
    this.state = { ...defaultState }
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
    this.props.onAddChannelSubmit(this.state.channels.toArray())
    this.setState({ ...defaultState })
    event.preventDefault()
    this.props.onAddChannelToggle()
  }
  public render() {
    return (
      <Modal
        isOpen={this.props.visible}
        toggle={this.props.onAddChannelToggle}
        id="addchannelmodal"
      >
        <Form onSubmit={this.handleSubmit}>
          <ModalHeader toggle={this.props.onAddChannelToggle}>
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
              onClick={this.props.onAddChannelToggle}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}
export default AddChannelModal
