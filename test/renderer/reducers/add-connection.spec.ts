// import { expect, use } from 'chai'
// import * as sinon from 'sinon'
// import * as sinonChai from 'sinon-chai'
// import { List } from 'immutable'

// import * as mAddServer from '../../../app/renderer/reducers/add-server'
// import { ConnectionFactory } from '../../../app/renderer/models/connections'
// import { ChannelFactory } from '../../../app/renderer/models/channel'
// import { addServer } from '../../../app/renderer/actions'
// import { ElectricState } from '../../../app/renderer/store'
// import { defaultStore } from '../../../app/renderer/reducers/reducers'

// import * as IRC from 'irc'

// use(sinonChai)

// describe('add-server reducer', function() {
//   let sandbox: sinon.SinonSandbox

//   let prevState = defaultStore
//   let nextState: ElectricState = undefined

//   before(function() {
//     sandbox = sinon.createSandbox()
//     sandbox.stub(IRC, 'Client').returns('Client')
//     prevState = prevState.set(
//       'connections',
//       List([
//         new ConnectionFactory({
//           id: 0,
//           name: 'Connection 1',
//           channels: List([
//             new ChannelFactory({ id: 1, name: '#channel1' }),
//             new ChannelFactory({ id: 2, name: '#channel2' })
//           ])
//         })
//       ])
//     )
//   })

//   describe('adding a server', function() {
//     before(function() {
//       nextState = mAddServer.default(
//         prevState,
//         addServer('Connection 2', 'beep.com', 'username', [
//           '#channel3',
//           '#channel4'
//         ])
//       )
//     })

//     it('has one more connection', function() {
//       expect(nextState.connections.count()).to.eq(2)
//     })

//     it('creates an IRC client', function() {
//       expect(IRC.Client).to.have.been.calledOnce
//     })
//   })

//   after(function() {
//     sandbox.restore()
//   })
// })
