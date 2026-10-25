<script setup>
import { ref } from 'vue'

const notes = ref([
  { id: 1, title: 'Pfand zurückgeben' },
  { id: 2, title: 'Zelt trocknen' },
  { id: 3, title: 'Bänke reservieren' },
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
      <button type="button" @click="remove(note.id)">Entfernen</button>
    </li>
  </ul>
</template>
