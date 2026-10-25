<script setup>
defineProps({
  deposit: { type: Number, required: true },
})
</script>

<template>
  <span class="price"><span class="currency">CHF</span> {{ deposit }} Pfand</span>
</template>
