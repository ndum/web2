<script setup>
import { ref } from 'vue'

const removed = ref('')
</script>

<template>
  <p>Three buttons with the same sign. Only two have a name for the screen reader.</p>
  <button type="button" @click="removed = '1'">✕</button>
  <button type="button" aria-label="Remove drill" @click="removed = '2'">✕</button>
  <button type="button" @click="removed = '3'">
    <span aria-hidden="true">✕</span>
    <span class="visually-hidden">Remove projector</span>
  </button>
  <p role="status">{{ removed && `Button ${removed} pressed` }}</p>
</template>

<style>
/* Hidden on the screen, read by a screen reader */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>
