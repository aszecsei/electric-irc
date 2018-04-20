import { expect, use } from 'chai'

import * as sinon from 'sinon'

import {
  saveFile,
  readFile
} from '../../../app/renderer/utilities/file-storage'

// TODO: Figure out how to stub ipcRenderer Q_Q
