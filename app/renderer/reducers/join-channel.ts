import { ElectricState } from '../store'
import { IJoinChannelAction } from '../actions'

export default function joinChannel(
  state: ElectricState,
  action: IJoinChannelAction
): ElectricState {
  let newState = { ...state }
  newState.connections = [...newState.connections]

  // TODO: Implement this

  return newState
}
