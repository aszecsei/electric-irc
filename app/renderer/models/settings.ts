import { Record } from 'immutable'

export interface ISettings {
  scrollback: boolean
  scrollbackLines?: number
  timestamps: boolean
  timeformat?: string
  urlgrabber: boolean
  maxurl: number
  autoaway: boolean
  defquit: string
  defleave: string
  defaway: string
  showawayonce: boolean
  hidejoin: boolean
  hidenicknamechange: boolean
  downloadfolder: string
  soundChannel: boolean
  soundPrivate: boolean
}

export const SettingFactory = Record<ISettings>({
  scrollback: true,
  scrollbackLines: 500,
  timestamps: true,
  timeformat: 'test',
  urlgrabber: true,
  maxurl: 50,
  autoaway: true,
  defquit: 'Leaving',
  defleave: 'Leaving',
  defaway: 'Gone',
  showawayonce: true,
  hidejoin: false,
  hidenicknamechange: false,
  downloadfolder: 'C:/',
  soundChannel: true,
  soundPrivate: true
})

export type Settings = Record<ISettings> & Readonly<ISettings>
