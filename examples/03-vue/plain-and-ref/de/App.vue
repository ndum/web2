<script setup>
import { ref } from 'vue'

let returnedPlain = 0
const returned = ref(0)

function countPlain() {
  returnedPlain++
  console.log('ohne ref', returnedPlain)
}

function countWithRef() {
  returned.value++
}
</script>

<template>
  <button type="button" @click="countPlain">Zählen ohne ref</button>
  <button type="button" @click="countWithRef">Zählen mit ref</button>
  <p>Ohne ref: {{ returnedPlain }}</p>
  <p>Mit ref: {{ returned }}</p>
</template>
