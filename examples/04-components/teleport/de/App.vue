<script setup>
import { ref } from 'vue'

const open = ref(false)
const teleported = ref(true)
</script>

<template>
  <label><input v-model="teleported" type="checkbox"> Mit Teleport</label>
  <div class="card">
    <button type="button" @click="open = true">Dialog öffnen</button>
    <!-- disabled keeps the content in place, the checkbox switches it -->
    <Teleport to="body" :disabled="!teleported">
      <div v-if="open" class="backdrop" @click.self="open = false">
        <div class="dialog" role="dialog" aria-modal="true" aria-label="Hinweis">
          <p>Der Dialog liegt über der ganzen Seite.</p>
          <button type="button" @click="open = false">Schliessen</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style>
/* A card that clips its content, as cards often do */
.card {
  overflow: hidden;
  height: 6rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #c8c8c8;
  transform: translateZ(0);
}
.backdrop {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgb(0 0 0 / 40%);
}
.dialog {
  padding: 1rem;
  border-radius: 8px;
  background: #ffffff;
}
</style>
