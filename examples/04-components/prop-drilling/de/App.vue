<script setup>
import ItemPage from './ItemPage.vue'

const member = { number: 'M-117', name: 'Martina Hostettler' }
</script>

<template>
  <ItemPage :member="member" />
</template>
