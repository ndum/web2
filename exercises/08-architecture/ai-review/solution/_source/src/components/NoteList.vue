<script setup>
import { computed, ref } from 'vue'

const props = defineProps({ notes: { type: Array, required: true } })

// A copy of the first state, the list changes here and leaves the prop alone
const list = ref(props.notes.map((note) => ({ ...note })))

// v-if and v-for never on the same element, a computed value filters first
const openNotes = computed(() => list.value.filter((note) => !note.done))

function remove(id) {
  list.value = list.value.filter((note) => note.id !== id)
}
</script>

<template>
  <h2>[%Notizen|Notes%]</h2>
  <ul class="notes">
    <!-- The id as key keeps every field with its note when another one disappears -->
    <li v-for="note in openNotes" :key="note.id">
      <label :for="`note-${note.id}`">{{ note.title }}</label>
      <input :id="`note-${note.id}`" type="text">
      <button type="button" @click="remove(note.id)">[%Entfernen|Remove%]</button>
    </li>
  </ul>
</template>
