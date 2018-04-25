import people from './people'
import activity from './activity'
import flags from './flags'
import foods from './foods'
import nature from './nature'
import objects from './objects'
import places from './places'
import symbols from './symbols'
import { emojiIndex } from 'emoji-mart'
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
  for (const field of Object.keys(emojiIndex.emojis)) {
    h[emojiIndex.emojis[field].colons] = emojiIndex.emojis[field].native
    for (const ii of Object.keys(emojiIndex.emojis[field].emoticons)) {
      h[emojiIndex.emojis[field].emoticons[+ii]] =
        emojiIndex.emojis[field].native
    }
  }
  h[':skin-tone-2:'] = '🏻'
  h[':skin-tone-3:'] = '🏼'
  h[':skin-tone-4:'] = '🏽'
  h[':skin-tone-5:'] = '🏾'
  h[':skin-tone-6:'] = '🏿'
  return h
}
function generate() {
  const h: string[] = []
  for (const field of Object.keys(emojiIndex.emojis)) {
    for (const i of Object.keys(emojiIndex.emojis[field].emoticons)) {
      h.push(emojiIndex.emojis[field].emoticons[+i])
    }
  }
  return h
}
export const emoticons = generate()
export const Emojis = combine()
