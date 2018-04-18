import { connect, Dispatch } from 'react-redux'
import { Theme } from '../components/theme'
import { ElectricState } from '../store'

const mapStateToProps = (state: ElectricState) => {
  return {
    properties: state.themeProperties
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ElectricState>) => {
  return {}
}

const ThemeContainer = connect(mapStateToProps, mapDispatchToProps)(Theme)

export default ThemeContainer
