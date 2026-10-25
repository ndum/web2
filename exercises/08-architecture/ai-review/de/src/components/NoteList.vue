<script setup>
import { ref } from 'vue'

const props = defineProps({ notes: { type: Array, required: true } })

const list = ref(props.notes)

function remove(index) {
  list.value.splice(index, 1)
}
</script>

<template>
  <h2>Notizen</h2>
  <ul class="notes">
    <li v-for="(note, index) in list" v-if="!note.done">
      <label :for="`note-${index}`">{{ note.title }}</label>
      <input :id="`note-${index}`" type="text">
      <button type="button" @click="remove(index)">Entfernen</button>
    </li>
  </ul>
</template>
