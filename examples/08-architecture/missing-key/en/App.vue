<script setup>
import { ref } from 'vue'

const notes = ref([
  { id: 1, title: 'Return the deposit' },
  { id: 2, title: 'Dry the tent' },
  { id: 3, title: 'Reserve the benches' },
])

function remove(id) {
  notes.value = notes.value.filter((note) => note.id !== id)
}
</script>

<template>
  <ul>
    <li v-for="(note, index) in notes" :key="index">
      <label :for="`note-${note.id}`">{{ note.title }}</label>
      <input :id="`note-${note.id}`" type="text">
      <button type="button" @click="remove(note.id)">Remove</button>
    </li>
  </ul>
</template>
