import { readonly, ref } from 'vue'

const list = ref([])

// Every component that imports this module sees the same requests. From outside they are
// only readable, changes go through the functions below.
export const requests = readonly(list)

export function add(thing) {
  if (!list.value.some((entry) => entry.id === thing.id)) list.value.push({ id: thing.id, name: thing.name })
}

export function remove(id) {
  list.value = list.value.filter((entry) => entry.id !== id)
}
