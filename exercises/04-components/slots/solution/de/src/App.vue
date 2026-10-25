<script setup>
import { ref } from 'vue'

import BaseDialog from '@/components/BaseDialog.vue'
import ItemList from '@/components/ItemList.vue'
import PageLayout from '@/components/PageLayout.vue'
import items from '../data/items.json'
import { formatDeposit } from './format.js'

const drill = items[0]
const open = ref(false)
const status = ref('')

function confirm() {
  open.value = false
  status.value = 'Reservationsanfrage erfasst.'
}
</script>

<template>
  <PageLayout>
    <template #header>
      <a href="#/">Lorraine Commons</a>
    </template>

    <h1>{{ drill.name }}</h1>
    <button type="button" class="send" @click="open = true">Anfrage senden</button>
    <p class="status" role="status">{{ status }}</p>
    <h2>Weitere Dinge</h2>
    <ItemList :items="items.slice(0, 6)">
      <template #item="{ item }">
        {{ item.name }}, Pfand {{ formatDeposit(item.deposit) }}
      </template>
    </ItemList>

    <template #footer>
      Mittwoch 17 bis 19 Uhr, Samstag 10 bis 13 Uhr
    </template>
  </PageLayout>

  <BaseDialog v-if="open" @close="open = false">
    <template #title>Anfrage prüfen</template>
    <p>{{ drill.name }}</p>
    <template #actions>
      <button type="button" class="confirm" @click="confirm">Bestätigen</button>
      <button type="button" @click="open = false">Zurück</button>
    </template>
  </BaseDialog>
</template>
