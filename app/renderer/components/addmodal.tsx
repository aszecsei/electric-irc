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
  Input
} from 'reactstrap'

interface IAddModalProps {
  visible: boolean
  onAddServerToggle: () => void
}

interface IAddModalState {
  name: string
  url: string
  nickname: string
  submitted: boolean
}

export class AddModal extends React.Component<IAddModalProps, IAddModalState> {
  constructor(props: IAddModalProps) {
    super(props)
    this.state = {
      name: 'Freenode',
      url: 'chat.freenode.net',
      nickname: 'Guest',
      submitted: false
    }
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

  handleSubmit = (event: any) => {
    this.setState({
      submitted: true
    })
    event.preventDefault()
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
