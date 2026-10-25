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
  status.value = '[%Reservationsanfrage erfasst.|Reservation request recorded.%]'
}
</script>

<template>
  <PageLayout>
    <template #header>
      <a href="#/">Lorraine Commons</a>
    </template>

    <h1>{{ drill.name }}</h1>
    <button type="button" class="send" @click="open = true">[%Anfrage senden|Send request%]</button>
    <p class="status" role="status">{{ status }}</p>
    <h2>[%Weitere Dinge|More things%]</h2>
    <ItemList :items="items.slice(0, 6)">
      <template #item="{ item }">
        {{ item.name }}, [%Pfand|deposit%] {{ formatDeposit(item.deposit) }}
      </template>
    </ItemList>

    <template #footer>
      [%Mittwoch 17 bis 19 Uhr, Samstag 10 bis 13 Uhr|Wednesday 5 to 7 p.m., Saturday 10 a.m. to 1 p.m.%]
    </template>
  </PageLayout>

  <BaseDialog v-if="open" @close="open = false">
    <template #title>[%Anfrage prüfen|Check the request%]</template>
    <p>{{ drill.name }}</p>
    <template #actions>
      <button type="button" class="confirm" @click="confirm">[%Bestätigen|Confirm%]</button>
      <button type="button" @click="open = false">[%Zurück|Back%]</button>
    </template>
  </BaseDialog>
</template>
