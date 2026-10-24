<script setup>
import { ref } from 'vue'

import BaseDialog from './BaseDialog.vue'

defineProps({ item: { type: Object, required: true } })

const memberNumber = ref('')
const open = ref(false)
</script>

<template>
  <form class="fields" @submit.prevent="open = true">
    <label for="member">Mitgliedernummer</label>
    <input id="member" v-model.trim="memberNumber">
    <button type="submit">Anfrage senden</button>
  </form>
  <BaseDialog v-if="open" @close="open = false">
    <template #title>Anfrage prüfen</template>
    <p>{{ item.name }}, {{ memberNumber }}</p>
  </BaseDialog>
</template>
