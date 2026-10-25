import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useAuthStore } from './auth.js'

export const useRequestsStore = defineStore('requests', () => {
  // A store can use another store, Pinia hands out the same login everywhere
  const auth = useAuthStore()
  const all = ref([])
  const mine = computed(() => all.value.filter((request) => request.member === auth.member?.number))

  function add(thing) {
    if (auth.member === null || mine.value.some((request) => request.id === thing.id)) return
    all.value.push({ member: auth.member.number, id: thing.id, name: thing.name })
  }

  return { all, mine, add }
})
