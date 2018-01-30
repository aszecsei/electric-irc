import { IClientOpts } from 'irc'

// TODO: Enable per-server settings
export class Options implements IClientOpts {
  userName = 'electricirc'
  realName = 'ElectricIRC client'
  port = 6667
  localAddress: string | undefined = undefined
  debug = false
  showErrors = false
  autoRejoin = false
  autoConnect = true
  channels = []
  secure = false
  selfSigned = false
  certExpired = false
  floodProtection = false
  floodProtectionDelay = 1000
  sasl = false
  retryCount = 0
  retryDelay = 2000
  stripColors = false
  channelPrefixes = '&#'
  messageSplit = 512
  encoding = ''

  storeOptions(): void {
    // TODO: Store the options to a file
  }

  loadOptions(): void {
    // TODO: Load the options from a file
  }
}

export function getOptions() {
  let opts = new Options()
  opts.loadOptions()
  return opts
}
