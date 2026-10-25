<script setup>
import { nextTick, ref, useTemplateRef } from 'vue'

import { things } from './things.js'

const favorites = ref(things.slice(0, 3))
const heading = useTemplateRef('heading')
const list = useTemplateRef('list')

// The removed button takes its focus along. The focus moves to the entry that takes its place,
// at the end to the one before, and to the heading once the list is empty.
async function remove(index) {
  favorites.value = favorites.value.filter((_, position) => position !== index)
  await nextTick()
  const buttons = list.value?.querySelectorAll('button') ?? []
  if (buttons.length > 0) buttons[Math.min(index, buttons.length - 1)].focus()
  else heading.value.focus()
}
</script>

<template>
  <h2 ref="heading" tabindex="-1">Favoriten</h2>
  <ul v-if="favorites.length > 0" ref="list">
    <li v-for="(thing, index) in favorites" :key="thing.id">
      {{ thing.name }}
      <button type="button" @click="remove(index)">Entfernen</button>
    </li>
  </ul>
  <p v-else>Noch keine Favoriten.</p>
</template>
