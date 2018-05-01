import { ElectricState } from '../store'
import { IRemoveServerAction } from '../actions'

export default function removeServer(
  state: ElectricState,
  action: IRemoveServerAction
): ElectricState {
  const newConns=state.connections.filter((v)=>v.id!==action.id)
  const newState = state.set('connections',  newConns)
  return newState
}
