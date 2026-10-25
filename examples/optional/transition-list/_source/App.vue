<script setup>
import { ref } from 'vue'

import { things } from './things.js'

const favorites = ref(things.slice(0, 3))

function add(thing) {
  if (!favorites.value.some((favorite) => favorite.id === thing.id)) favorites.value = [...favorites.value, thing]
}

function remove(id) {
  favorites.value = favorites.value.filter((favorite) => favorite.id !== id)
}

function sortByName() {
  favorites.value = favorites.value.toSorted((a, b) => a.name.localeCompare(b.name))
}
</script>

<template>
  <p class="actions">
    <button v-for="thing in things" :key="thing.id" type="button" @click="add(thing)">[%{{ thing.name }} merken|Add {{ thing.name }}%]</button>
    <button type="button" @click="sortByName">[%Nach Name sortieren|Sort by name%]</button>
  </p>
  <!-- TransitionGroup animates entries that enter, leave and move, each needs its key -->
  <TransitionGroup name="list" tag="ul" class="favorites">
    <li v-for="thing in favorites" :key="thing.id">
      {{ thing.name }}
      <button type="button" @click="remove(thing.id)">[%Entfernen|Remove%]</button>
    </li>
  </TransitionGroup>
</template>

<style>
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.favorites {
  position: relative;
  padding: 0;
  list-style: none;
}

.favorites li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 0.25rem 0;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(2rem);
}

/* A leaving entry leaves the flow, so the others can move up while it fades */
.list-leave-active {
  position: absolute;
}

@media (prefers-reduced-motion: reduce) {
  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: none;
  }
}
</style>
