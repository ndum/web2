<script setup>
import AppHeader from '@/components/AppHeader.vue'
import ItemList from '@/components/ItemList.vue'
import RequestList from '@/components/RequestList.vue'
</script>

<template>
  <AppHeader />
  <main>
    <h1>[%Katalog|Catalog%]</h1>
    <RequestList />
    <ItemList />
  </main>
</template>
