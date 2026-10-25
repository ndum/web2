<script setup>
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue'

console.log('setup')
const clicks = ref(0)

onBeforeMount(() => console.log('onBeforeMount'))
onMounted(() => console.log('onMounted'))
onBeforeUpdate(() => console.log('onBeforeUpdate'))
onUpdated(() => console.log('onUpdated'))
onBeforeUnmount(() => console.log('onBeforeUnmount'))
onUnmounted(() => console.log('onUnmounted'))
</script>

<template>
  <p>
    <button type="button" @click="clicks++">Klicks: {{ clicks }}</button>
  </p>
</template>
