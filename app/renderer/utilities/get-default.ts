import { Collection } from 'immutable'

export function get<K, V>(
  collection: Collection<K, V>,
  key: K,
  defaultValue: V
) {
  const result = collection.get(key)
  if (result) {
    return result
  } else {
    return defaultValue
  }
}
