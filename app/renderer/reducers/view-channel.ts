import { ElectricState } from '../store'
import { IViewChannelAction } from '../actions'

export default function sendMessage(
  state: ElectricState,
  action: IViewChannelAction
): ElectricState {
  let newState = { ...state }

  // TODO: Implement this

  return newState
}
