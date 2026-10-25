<script setup>
import { ref } from 'vue'

let returnedPlain = 0
const returned = ref(0)

function countPlain() {
  returnedPlain++
  console.log('[%ohne ref|without ref%]', returnedPlain)
}

function countWithRef() {
  returned.value++
}
</script>

<template>
  <button type="button" @click="countPlain">[%Zählen ohne ref|Count without ref%]</button>
  <button type="button" @click="countWithRef">[%Zählen mit ref|Count with ref%]</button>
  <p>[%Ohne ref|Without ref%]: {{ returnedPlain }}</p>
  <p>[%Mit ref|With ref%]: {{ returned }}</p>
</template>
