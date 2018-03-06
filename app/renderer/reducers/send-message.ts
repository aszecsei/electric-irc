import { ElectricState } from '../store'
import { ISendMessageAction } from '../actions'

export default function sendMessage(
  state: ElectricState,
  action: ISendMessageAction
): ElectricState {
  let newState = { ...state }
  newState.connections = [...newState.connections]

  // TODO: Implement this

  return newState
}
