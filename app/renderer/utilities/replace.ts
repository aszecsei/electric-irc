import { List } from 'immutable'

export function replace<K>(list: List<K>, oldElement: K, newElement: K) {
  const oldIndex = list.indexOf(oldElement)
  if (oldIndex !== -1) {
    return list.set(oldIndex, newElement)
  } else {
    return list
  }
}
