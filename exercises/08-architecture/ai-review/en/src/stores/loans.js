import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoansStore = defineStore('loans', () => {
  const loans = ref([])
  // The ids of the loans the team has reminded
  const reminded = ref([])

  async function load() {
    const response = await fetch(`${import.meta.env.BASE_URL}loans.json`)
    loans.value = await response.json()
  }

  function remind(id) {
    if (!reminded.value.includes(id)) reminded.value.push(id)
  }

  return { loans, reminded, load, remind }
})
