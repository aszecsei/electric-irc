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
      irc: 'test'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }
  handleChange(event: any) {
    this.setState({ irc: event.target.irc })
  }

  handleSubmit(event: any) {
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
                <Label for="IRC" hidden>
                  chat.freenode.net
                </Label>
                <Input
                  type="text"
                  value={this.state.irc}
                  onChange={this.handleChange}
                  name="IRC"
                  id="IRC"
                  placeholder="IRC"
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
