import { expect, use } from 'chai'
import { List } from 'immutable'

import { ElectricState } from '../../../app/renderer/store'
import { defaultStore } from '../../../app/renderer/reducers/reducers'
import { Guid } from '../../../app/renderer/models'
import themeWholesale1 from "../../../app/renderer/reducers/theme-wholesale";
import {themeWholesale} from "../../../app/renderer/actions";

describe('change theme reducer', function() {
  const prevState = defaultStore
  let nextState: ElectricState
  let nextNextState: ElectricState
  const connid = Guid.create()

  describe('setting theme to dark', function() {
    before(function() {
      nextState = themeWholesale1(
        prevState,
        themeWholesale("dark")
      )
      nextNextState = themeWholesale1(
        nextState,
        themeWholesale("dark")
      )
    })

    it('should set the theme to dark', function() {
      expect(nextState.themeName).to.equal("dark")
    })

    it('should continue setting the theme to dark', function() {
    expect(nextState.themeName).to.equal("dark")
    })
  })

  describe('toggling a theme back and forth', function() {
      before(function() {
          nextState = themeWholesale1(
              prevState,
              themeWholesale("dark")
          )
          nextNextState = themeWholesale1(
              nextState,
              themeWholesale("light")
          )
      })

    it('should toggle the modal visibility', function() {
      expect(nextState.themeName).to.not.eq(
        nextNextState.themeName
      )
    })
  })
})
