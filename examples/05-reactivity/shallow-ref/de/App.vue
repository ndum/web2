<script setup>
import { shallowRef, triggerRef } from 'vue'

// Only a new value for .value triggers an update, changes inside the array do not
const items = shallowRef([{ id: 1, name: 'Bohrmaschine' }])

function pushInside() {
  items.value.push({ id: items.value.length + 1, name: 'Leiter' })
}

function replace() {
  items.value = [...items.value, { id: items.value.length + 1, name: 'Zelt' }]
}

// In the template, items would arrive unwrapped, triggerRef needs the ref itself
function force() {
  triggerRef(items)
}
</script>

<template>
  <button type="button" @click="pushInside">Im Array ergänzen</button>
  <button type="button" @click="replace">Array ersetzen</button>
  <button type="button" @click="force">triggerRef</button>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</template>
