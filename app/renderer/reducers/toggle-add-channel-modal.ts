import { ElectricState } from '../store'
import { IToggleAddChannelModalAction } from '../actions'

export default function toggleAddServerModal(
  state: ElectricState,
  action: IToggleAddChannelModalAction
): ElectricState {
  const newState = state.set('addChannelConnId', action.connid)
  return newState
}
