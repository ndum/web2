<script setup>
const props = defineProps({ count: { type: Number, required: true } })

function add() {
  props.count++
}
</script>

<template>
  <button type="button" @click="add">Dazuzählen</button>
</template>
