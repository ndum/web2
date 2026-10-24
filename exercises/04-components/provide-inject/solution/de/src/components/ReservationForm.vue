<script setup>
import { inject, ref } from 'vue'

import BaseDialog from './BaseDialog.vue'
import { memberKey } from '@/keys.js'

defineProps({ item: { type: Object, required: true } })

const member = inject(memberKey, null)
// The field starts with the number of the signed-in member and stays editable
const memberNumber = ref(member?.value.number ?? '')
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
