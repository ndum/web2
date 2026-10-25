<script setup>
const props = defineProps({
  loan: { type: Object, required: true },
  reminded: { type: Boolean, default: false },
})

function remind() {
  props.reminded = true
}
</script>

<template>
  <li>
    {{ loan.name }}
    <span v-if="reminded" class="reminded">reminded</span>
    <button type="button" @click="remind">Remind</button>
  </li>
</template>
