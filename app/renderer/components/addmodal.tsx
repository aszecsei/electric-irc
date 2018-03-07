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

export class AddModal extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      modal: false,
      irc: 'chat.freenode.net',
      name: 'Guest',
      submitted: false
    }
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }
  handleChangeName = (event: any) => {
    if (
      event.target.value.match(
        '[a-z_\\-\\[\\]\\\\^{}|`][a-z0-9_\\-\\[\\]\\\\^{}|`]{2,15}'
      )
    ) {
      this.setState({
        name: event.target.value
      })
      event.target.classList.add('is-valid')
      event.target.classList.remove('is-invalid')
    } else {
      this.setState({
        name: event.target.value
      })
      event.target.classList.add('is-invalid')
      event.target.classList.remove('is-valid')
    }
  }
  handleChangeIRC = (event: any) => {
    this.setState({
      irc: event.target.value
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
        isOpen={this.state.modal}
        toggle={this.toggle}
        className={this.props.className}
        id="addmodal"
      >
        <Form onSubmit={this.handleSubmit}>
          <ModalHeader toggle={this.toggle}>Add new server</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="IRC">IRC name:</Label>
              <Input
                className={'IRC'}
                type="text"
                value={this.state.irc}
                onChange={this.handleChangeIRC}
                name="IRC"
                id="IRC"
                placeholder="IRC"
              />
              <Label for="Nickname">Nickname:</Label>
              <Input
                className={'Nickname'}
                type="text"
                value={this.state.name}
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
            <Button color="secondary" type="button" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}
export default AddModal
