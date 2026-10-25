<script setup>
import { nextTick, useTemplateRef } from 'vue'

defineProps({ items: { type: Array, required: true } })

const emit = defineEmits(['remove'])
const heading = useTemplateRef('heading')
const list = useTemplateRef('list')

// The button disappears together with its focus. The focus moves to the entry that takes its place,
// at the end of the list to the one before, and to the heading once the list is empty.
async function remove(id, index) {
  emit('remove', id)
  await nextTick()
  const buttons = list.value?.querySelectorAll('button.remove') ?? []
  if (buttons.length > 0) buttons[Math.min(index, buttons.length - 1)].focus()
  else heading.value.focus()
}
</script>

<template>
  <section>
    <h2 ref="heading" tabindex="-1">[%Favoriten|Favorites%]</h2>
    <ul v-if="items.length > 0" ref="list" class="favorites">
      <li v-for="(item, index) in items" :key="item.id">
        {{ item.name }}
        <button type="button" class="remove" @click="remove(item.id, index)">
          <span aria-hidden="true">✕</span>
          <span class="visually-hidden">[%Entfernen|Remove%]: {{ item.name }}</span>
        </button>
      </li>
    </ul>
    <p v-else>[%Noch keine Favoriten.|No favorites yet.%]</p>
  </section>
</template>
