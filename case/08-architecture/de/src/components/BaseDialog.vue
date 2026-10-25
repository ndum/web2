<script setup>
import { onMounted, onUnmounted, useId, useTemplateRef } from 'vue'

const emit = defineEmits(['close'])

// A unique id connects the dialog with its title
const titleId = useId()
const dialog = useTemplateRef('dialog')

// The element that had the focus before the dialog opened
let opener = null

function onKeydown(event) {
  if (event.key === 'Escape') emit('close')
}

onMounted(() => {
  // The listener lives as long as the dialog, not longer
  window.addEventListener('keydown', onKeydown)
  opener = document.activeElement
  // The keyboard goes on inside the dialog, at its first button
  dialog.value.querySelector('button').focus()
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  // The focus returns to where it was, usually the button that opened the dialog
  opener?.focus()
})
</script>

<template>
  <!-- The dialog leaves the component and ends up at the end of the page -->
  <Teleport to="body">
    <div class="backdrop">
      <div ref="dialog" class="dialog" role="dialog" aria-modal="true" :aria-labelledby="titleId">
        <h2 :id="titleId">
          <slot name="title">Hinweis</slot>
        </h2>
        <slot />
        <div class="actions">
          <slot name="actions">
            <button type="button" @click="$emit('close')">Schliessen</button>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgb(0 0 0 / 40%);
}
.dialog {
  max-width: 24rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  background: #ffffff;
}
.actions {
  display: flex;
  gap: 0.5rem;
}
</style>
