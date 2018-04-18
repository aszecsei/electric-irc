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
import { Guid } from '../models/guid'

interface IAddChannelModalProps {
  connid: Guid | undefined
  onAddChannelToggle: () => void
  onAddChannelSubmit: (connid: Guid, channel: string) => void
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

  // // handleAddChannel = (event: any) => {
  // //   this.setState({
  // //     channels: this.state.channels.push('')
  // //   })
  // // }

  // generateHandleChangeChannel = () => {
  //   return (event: any) => {
  //     this.setState({
  //       channel: event.target.value
  //     })
  //   }
  // }
  // // generateHandleDeleteChannel = (index: number) => {
  // //   return (event: any) => {
  // //     this.setState({
  // //       channels: this.state.channels.remove(index)
  // //     })
  // //   }
  // // }

  // handleSubmit = (event: any) => {
  //   this.props.onAddChannelSubmit()
  //   this.setState({ ...defaultState })
  //   event.preventDefault()
  //   this.props.onAddChannelToggle()
  // }
  // public render() {
  //   return (
  //     <Modal
  //       isOpen={this.props.connid !== undefined}
  //       toggle={this.props.onAddChannelToggle}
  //       id="addchannelmodal"
  //     >
  //       <Form onSubmit={this.handleSubmit}>
  //         <ModalHeader toggle={this.props.onAddChannelToggle}>
  //           Add new server
  //         </ModalHeader>
  //         <ModalBody>
  //           <FormGroup>
  //             <InputGroup>
  //               <Input
  //                 className={'Channel'}
  //                 type="text"
  //                 value={this.state.channel}
  //                 onChange={this.generateHandleChangeChannel()}
  //                 name={`channel`}
  //                 id={`channel`}
  //                 placeholder={'#'}
  //               />
  //             </InputGroup>
  //           </FormGroup>
  //         </ModalBody>
  //         <ModalFooter>
  //           <Button color="primary" type="submit">
  //             Add
  //           </Button>{' '}
  //           <Button
  //             color="secondary"
  //             type="button"
  //             onClick={this.props.onAddChannelToggle}
  //           >
  //             Cancel
  //           </Button>
  //         </ModalFooter>
  //       </Form>
  //     </Modal>
  //   )
  // }
}
export default AddChannelModal
