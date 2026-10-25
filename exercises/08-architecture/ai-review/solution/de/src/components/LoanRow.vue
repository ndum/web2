<script setup>
defineProps({
  loan: { type: Object, required: true },
  reminded: { type: Boolean, default: false },
})

// A prop belongs to the parent, the row only reports the click
const emit = defineEmits(['remind'])
</script>

<template>
  <li>
    {{ loan.name }}
    <span v-if="reminded" class="reminded">erinnert</span>
    <button type="button" @click="emit('remind', loan.id)">Erinnern</button>
  </li>
</template>
