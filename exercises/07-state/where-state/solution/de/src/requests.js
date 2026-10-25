import { readonly, ref } from 'vue'

const list = ref([])

// Every component that imports this module sees the same requests. From outside they are
// only readable, changes go through add and remove.
export const requests = readonly(list)

export function add(item) {
  if (list.value.some((request) => request.id === item.id)) return
  list.value.push({ id: item.id, name: item.name })
}

export function remove(id) {
  list.value = list.value.filter((request) => request.id !== id)
}
