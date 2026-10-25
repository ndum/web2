<script setup>
import { onRenderTracked, onRenderTriggered, ref } from 'vue'

const favorites = ref([1, 6])
const query = ref('')

// Vue reports which values the render function reads and which change makes it run again
onRenderTracked((event) => console.log('read', event.type, String(event.key)))
onRenderTriggered((event) => console.log('triggered', event.type, String(event.key)))
</script>

<template>
  <p>{{ favorites.length }} favorites</p>
  <button type="button" @click="favorites.push(3)">Save the raclette oven</button>
  <button type="button" @click="query = 'tent'">Change the search text</button>
</template>
