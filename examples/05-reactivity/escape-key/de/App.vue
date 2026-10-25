<script setup>
import { ref } from 'vue'

import NoticeBox from './NoticeBox.vue'

const open = ref(false)
</script>

<template>
  <button type="button" @click="open = true">Hinweis öffnen</button>
  <NoticeBox v-if="open" @close="open = false" />
</template>
