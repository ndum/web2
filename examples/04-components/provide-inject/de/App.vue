<script setup>
import { provide, readonly, ref } from 'vue'

import ItemPage from './ItemPage.vue'
import { memberKey } from './keys.js'

const member = ref({ number: 'M-117', name: 'Martina Hostettler' })

// Every component below App can inject the member, readonly keeps the changes in App
provide(memberKey, readonly(member))
</script>

<template>
  <ItemPage />
</template>
