import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { AppLoader } from './components/app-loader'

// tslint:disable-next-line:no-submodule-imports
import 'material-design-icons/iconfont/material-icons.css'

// tslint:disable-next-line:no-submodule-imports
import 'typeface-roboto/index.css'
import './stylesheets/main.scss'
// tslint:disable-next-line:no-submodule-imports
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(<AppLoader />, document.getElementById('app'))
