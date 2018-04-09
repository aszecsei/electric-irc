import { List } from 'immutable'
import { ElectricState } from '../store'
import { IChangeNickAction } from '../actions'
function replace_at<K>(list: List<K>, ind: number, newElement: K) {
  if (ind !== -1) {
    return list.set(ind, newElement)
  } else {
    return list
  }
}
// export default function changeNick(
//   state: ElectricState,
//   action: IChangeNickAction
// ): ElectricState {
//   const index = state.connections.findKey(value => {
//     return value.id === action.id
//   })
//   const conn = state.connections.find(value => {
//     return value.id === action.id
//   })
//   if (conn) {
//     const newConn = conn.set('nickname', action.nickname)
//     const newState = state.set(
//       'connections',
//       replace_at(state.connections, index as number, newConn)
//     )
//     return newState
//   }
//   return state
// }
