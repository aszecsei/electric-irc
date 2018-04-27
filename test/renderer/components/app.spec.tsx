import { expect, use } from 'chai'
import * as chaiEnzyme from 'chai-enzyme'

import * as React from 'react'
import { shallow, mount } from 'enzyme'

const configureMockStore = require('redux-mock-store')

import { App } from '../../../app/renderer/components/app'
import ThemeContainer from '../../../app/renderer/containers/theme-container'
import SidebarContainer from '../../../app/renderer/containers/sidebar-container'
import ChatWindowContainer from '../../../app/renderer/containers/irc-window-container'
import { defaultStore } from '../../../app/renderer/reducers/reducers'

// const shallowWithStore = (component, store) => {
//   const context = {
//     store,
//   };
//   return shallow(component, { context });
// };

const middlewares = []
const fakeStore = configureMockStore(middlewares)(defaultStore)

describe('app', function() {
  it('has a sidebar', function() {
    const wrapper = shallow(<App />, { context: { store: fakeStore } })
    expect(wrapper.contains(<SidebarContainer />)).to.be.true
  })

  it('has a chat window', function() {
    const wrapper = shallow(<App />, { context: { store: fakeStore } })
    expect(wrapper.contains(<ChatWindowContainer />)).to.be.true
  })
})
