import Immutable from 'immutable'
import { color, lighten, darken } from '../utils/colors'
import * as polished from 'polished'

export let map: Immutable.Map<
  string,
  Immutable.Map<string, string>
> = Immutable.Map.of(
  'dark',
  Immutable.Map.of(
    '--bg',
    polished.lighten(lighten, color.get('black')!),
    '--primary-text',
    color.get('white'),
    '--secondary-text',
    polished.rgba(color.get('white'),.7),
    '--disabled-text',
    polished.rgba(color.get('white'),.5),
    '--dividers',
    polished.rgba(color.get('white'),.12),
    '--primary',
    color.get('blue'),
    '--primary-light',
    polished.lighten(lighten, color.get('blue')!),
    '--primary-dark',
    polished.darken(darken, color.get('blue')!),
    '--secondary',
    color.get('yellow'),
    '--secondary-light',
    polished.lighten(lighten, color.get('yellow')!),
    '--secondary-dark',
    polished.darken(darken, color.get('yellow')!)
  )
)
