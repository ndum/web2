<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })
// Taking the object apart copies the number, the copy no longer follows the state
const { count } = state

function add() {
  state.count++
}
</script>

<template>
  <button type="button" @click="add">[%Dazuzählen|Count up%]</button>
  <p>state.count: {{ state.count }}</p>
  <p>count: {{ count }}</p>
</template>
