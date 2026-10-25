<script setup>
import { ref } from 'vue'

const removed = ref('')
</script>

<template>
  <p>Drei Knöpfe mit demselben Zeichen. Nur zwei haben einen Namen für den Screenreader.</p>
  <button type="button" @click="removed = '1'">✕</button>
  <button type="button" aria-label="Bohrmaschine entfernen" @click="removed = '2'">✕</button>
  <button type="button" @click="removed = '3'">
    <span aria-hidden="true">✕</span>
    <span class="visually-hidden">Beamer entfernen</span>
  </button>
  <p role="status">{{ removed && `Knopf ${removed} gedrückt` }}</p>
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
