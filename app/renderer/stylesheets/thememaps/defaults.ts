import Immutable from 'immutable'
import { color } from '../utils/colors'

export let map: Immutable.Map<
  string,
  Immutable.Map<string, string>
> = Immutable.Map.of(
  'dark',
  Immutable.Map.of(
    '--bg',
    color.get('grey'),
    '--primary-text',
    '$white',
    '--secondary-text',
    'rgba($white, 70)',
    '--disabled-text',
    'rgba($white, 50)',
    '--dividers',
    'rgba($white, 12)',
    '--primary',
    '#350A6A',
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
)
