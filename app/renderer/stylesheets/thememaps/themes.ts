import * as defaults from './defaults'
import * as customs from './custom'
import Immutable from 'immutable'

export let theme: Immutable.Map<
  string,
  Immutable.Map<string, string>
> = defaults.map.merge(customs.map)

export let backup: Immutable.Map<string, string> = Immutable.Map.of(
  '--bg',
  'lighten($black, $lighten-amount)',
  '--primary-text',
  '$white',
  '--secondary-text',
  'rgba($white, 70)',
  '--disabled-text',
  'rgba($white, 50)',
  '--dividers',
  'rgba($white, 12)',
  '--primary',
  '$blue',
  '--primary-light',
  'lighten($blue, $lighten-amount)',
  '--primary-dark',
  'darken($blue, $darken-amount)',
  '--secondary',
  '$yellow',
  '--secondary-light',
  'lighten($yellow, $lighten-amount)',
  '--secondary-dark',
  'darken($yellow, $darken-amount)'
)
