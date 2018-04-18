import Immutable from 'immutable'
import { color, lighten, darken } from '../utils/colors'
import * as polished from 'polished'
import { get } from '../../utilities/get-default'

export let map: Immutable.Map<
  string,
  Immutable.Map<string, string>
> = Immutable.Map.of(
  'dark',
  Immutable.Map.of(
    '--bg',
    polished.lighten(lighten, get(color, 'black', 'black')),
    '--primary-text',
    get(color, 'white', 'white'),
    '--secondary-text',
    polished.rgba(get(color, 'white', 'white'), 0.7),
    '--disabled-text',
    polished.rgba(get(color, 'white', 'white'), 0.5),
    '--dividers',
    polished.rgba(get(color, 'white', 'white'), 0.12),
    '--primary',
    color.get('blue'),
    '--primary-light',
    polished.lighten(lighten, get(color, 'blue', 'blue')),
    '--primary-dark',
    polished.darken(darken, get(color, 'blue', 'blue')),
    '--secondary',
    get(color, 'yellow', '#00ffff'),
    '--secondary-light',
    polished.lighten(lighten, get(color, 'yellow', 'yellow')),
    '--secondary-dark',
    polished.darken(darken, get(color, 'yellow', 'yellow'))
  ),
  'light',
  Immutable.Map.of(
    '--bg',
    polished.lighten(darken, get(color, 'white', 'white')),
    '--primary-text',
    get(color, 'black', 'black'),
    '--secondary-text',
    polished.rgba(get(color, 'black', 'black'), 0.7),
    '--disabled-text',
    polished.rgba(get(color, 'black', 'black'), 0.5),
    '--dividers',
    polished.rgba(get(color, 'black', 'black'), 0.12),
    '--primary',
    color.get('orange'),
    '--primary-light',
    polished.lighten(lighten, get(color, 'orange', 'orange')),
    '--primary-dark',
    polished.darken(darken, get(color, 'orange', 'orange')),
    '--secondary',
    get(color, 'black', 'black'),
    '--secondary-light',
    polished.lighten(lighten, get(color, 'blue', 'blue')),
    '--secondary-dark',
    polished.darken(darken, get(color, 'blue', 'blue'))
  )
)
