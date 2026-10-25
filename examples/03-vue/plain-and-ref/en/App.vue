<script setup>
import { ref } from 'vue'

let returnedPlain = 0
const returned = ref(0)

function countPlain() {
  returnedPlain++
  console.log('without ref', returnedPlain)
}

function countWithRef() {
  returned.value++
}
</script>

<template>
  <button type="button" @click="countPlain">Count without ref</button>
  <button type="button" @click="countWithRef">Count with ref</button>
  <p>Without ref: {{ returnedPlain }}</p>
  <p>With ref: {{ returned }}</p>
</template>
