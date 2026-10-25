<script setup>
import { ref } from 'vue'

import Counter from './Counter.vue'

const count = ref(0)
</script>

<template>
  <p>Counted: {{ count }}</p>
  <Counter :count="count" />
</template>
