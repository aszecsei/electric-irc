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
import { Connection } from '../models/connections'
import { Guid } from '../models/guid'

interface IAddChannelModalProps {
  connID: Guid | undefined
  onAddChannelToggle: () => void
  onAddChannelSubmit: (connid: Guid, channel: string) => void
  connections: List<Connection>
}

interface IAddChannelModalState {
  channel: string
}

const defaultState = {
  channel: ''
}

export class AddChannelModal extends React.Component<
  IAddChannelModalProps,
  IAddChannelModalState
> {
  constructor(props: IAddChannelModalProps) {
    super(props)
    this.state = { ...defaultState }
  }

  generateHandleChangeChannel = () => {
    return (event: any) => {
      this.setState({
        channel: event.target.value
      })
      if (/^#[^\s]+/.exec(event.target.value)) {
        event.target.classList.add('is-valid')
        event.target.classList.remove('is-invalid')
      } else {
        event.target.classList.remove('is-valid')
        event.target.classList.add('is-invalid')
      }
    }
  }

  handleSubmit = (event: any) => {
    console.log('1')
    event.preventDefault()
    if (this.props.connID && /^#[^\s]+/.exec(this.state.channel)) {
      console.log('2')
      const conn = this.props.connections.find(v => {
        return v.id === this.props.connID
      })
      if (conn) {
        console.log('3')
        const chan = conn.channels.find(v => {
          return v.name === this.state.channel
        })
        if (!chan) {
          console.log('4')
          this.props.onAddChannelSubmit(this.props.connID, this.state.channel)
          this.setState({ ...defaultState })
          this.props.onAddChannelToggle()
        }
      }
    }
  }
  public render() {
    return (
      <Modal
        isOpen={this.props.connID !== undefined}
        toggle={this.props.onAddChannelToggle}
        id="addchannelmodal"
      >
        <Form onSubmit={this.handleSubmit}>
          <ModalHeader toggle={this.props.onAddChannelToggle}>
            Add Channel
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <InputGroup>
                <Input
                  className={'Channel'}
                  type="text"
                  value={this.state.channel}
                  onChange={this.generateHandleChangeChannel()}
                  name={`channel`}
                  id={`channel`}
                  placeholder={'#'}
                />
              </InputGroup>
            </FormGroup>
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
