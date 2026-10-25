<script setup>
import PageLayout from './PageLayout.vue'
</script>

<template>
  <PageLayout>
    <template #header>
      <a href="#/">Lorraine Commons</a>
    </template>

    <h1>Katalog</h1>
    <p>Alles ohne Namen landet im Standard-Slot.</p>

    <template #footer>
      Mittwoch 17 bis 19 Uhr, Samstag 10 bis 13 Uhr
    </template>
  </PageLayout>
</template>
