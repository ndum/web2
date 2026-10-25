<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const time = ref(new Date().toLocaleTimeString('de-CH'))
let timer

onMounted(() => {
  timer = setInterval(() => {
    time.value = new Date().toLocaleTimeString('de-CH')
    console.log('tick', time.value)
  }, 1000)
})

// Without this line the timer keeps running after the clock is gone
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <p>Es ist {{ time }}</p>
</template>
