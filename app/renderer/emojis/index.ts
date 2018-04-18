import people from './people'
import activity from './activity'
import flags from './flags'
import foods from './foods'
import nature from './nature'
import objects from './objects'
import places from './places'
import symbols from './symbols'
function combine() {
  const h: { [key: string]: string } = {}
  let i = 0
  while (i < people.length) {
    h[people[i].alias] = people[i].emoji
    i += 1
  }
  i = 0
  while (i < activity.length) {
    h[activity[i].alias] = activity[i].emoji
    i += 1
  }
  i = 0
  while (i < flags.length) {
    h[flags[i].alias] = flags[i].emoji
    i += 1
  }
  i = 0
  while (i < foods.length) {
    h[foods[i].alias] = foods[i].emoji
    i += 1
  }
  i = 0
  while (i < nature.length) {
    h[nature[i].alias] = nature[i].emoji
    i += 1
  }
  i = 0
  while (i < objects.length) {
    h[objects[i].alias] = objects[i].emoji
    i += 1
  }
  i = 0
  while (i < places.length) {
    h[places[i].alias] = places[i].emoji
    i += 1
  }
  i = 0
  while (i < symbols.length) {
    h[symbols[i].alias] = symbols[i].emoji
    i += 1
  }
  return h
}
export const Emojis = combine()
