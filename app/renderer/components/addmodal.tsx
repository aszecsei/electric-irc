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
      modal: true,
      irc: 'chat.freenode.net',
      name: 'Guest'
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
    alert('A name was submitted: ' + this.state.irc)
    event.preventDefault()
  }
  public render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <Form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle}>Add new server</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="IRC">IRC name:</Label>
                <Input
                  type="text"
                  value={this.state.irc}
                  onChange={this.handleChangeIRC}
                  name="IRC"
                  id="IRC"
                  placeholder="IRC"
                />
                <Label for="Nickname">Nickname:</Label>
                <Input
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
      </div>
    )
  }
}
export default AddModal
