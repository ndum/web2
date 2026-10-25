<script setup>
import { useId } from 'vue'

defineEmits(['close'])

// A unique id connects the dialog with its title
const titleId = useId()
</script>

<template>
  <!-- The dialog leaves the component and ends up at the end of the page -->
  <Teleport to="body">
    <div class="backdrop">
      <div class="dialog" role="dialog" aria-modal="true" :aria-labelledby="titleId">
        <h2 :id="titleId">
          <slot name="title">Notice</slot>
        </h2>
        <slot />
        <div class="actions">
          <slot name="actions">
            <button type="button" @click="$emit('close')">Close</button>
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
