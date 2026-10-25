<script setup>
import { onRenderTracked, onRenderTriggered, ref } from 'vue'

const favorites = ref([1, 6])
const query = ref('')

// Vue reports which values the render function reads and which change makes it run again
onRenderTracked((event) => console.log('[%gelesen|read%]', event.type, String(event.key)))
onRenderTriggered((event) => console.log('[%ausgelöst|triggered%]', event.type, String(event.key)))
</script>

<template>
  <p>{{ favorites.length }} [%Favoriten|favorites%]</p>
  <button type="button" @click="favorites.push(3)">[%Raclette-Ofen merken|Save the raclette oven%]</button>
  <button type="button" @click="query = '[%Zelt|tent%]'">[%Suchtext ändern|Change the search text%]</button>
</template>
