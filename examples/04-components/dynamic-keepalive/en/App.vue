<script setup>
import { shallowRef } from 'vue'

import NoteTab from './NoteTab.vue'
import RulesTab from './RulesTab.vue'

// shallowRef, because a component itself should not become reactive
const current = shallowRef(NoteTab)
</script>

<template>
  <button type="button" @click="current = NoteTab">Note</button>
  <button type="button" @click="current = RulesTab">Rules</button>
  <!-- KeepAlive keeps the component that is not shown, with its state -->
  <KeepAlive>
    <component :is="current" />
  </KeepAlive>
</template>
