import { ElectricState } from '../store'
import { IRemoveChannelAction } from '../actions'

import { replace } from '../utilities/replace'

export default function removeChannel(
  state: ElectricState,
  action: IRemoveChannelAction
): ElectricState {
    let newState=state
    const Conn=state.connections.find((v)=>v.id===action.serverId)
    if(Conn){
        const newChannels=Conn.channels.filter((v)=>v.id!==action.channelId)
        if(newChannels){
            const newConn=Conn.set('channels',newChannels)
            newState = state.set(
                'connections',
                replace(state.connections, Conn, newConn)
            )
        }
    }
    return newState
}