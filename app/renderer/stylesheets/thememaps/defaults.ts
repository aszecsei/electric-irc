import Immutable from 'immutable'

export let map: Immutable.Map<
  string,
  Immutable.Map<string, string>
> = Immutable.Map.of(
  'dark',
  Immutable.Map.of(
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
)
