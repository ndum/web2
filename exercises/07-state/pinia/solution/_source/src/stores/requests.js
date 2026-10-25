import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useAuthStore } from './auth.js'

export const useRequestsStore = defineStore('requests', () => {
  const auth = useAuthStore()
  const list = ref([])
  // The requests of whoever is signed in
  const mine = computed(() => list.value.filter((request) => request.member === auth.member?.number))

  function add(itemId) {
    if (auth.member === null || mine.value.some((request) => request.itemId === itemId)) return
    list.value.push({ itemId, member: auth.member.number })
  }

  // A setup store has no $reset of its own, this one empties the list
  function $reset() {
    list.value = []
  }

  return { list, mine, add, $reset }
})
