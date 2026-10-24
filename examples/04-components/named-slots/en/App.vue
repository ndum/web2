<script setup>
import PageLayout from './PageLayout.vue'
</script>

<template>
  <PageLayout>
    <template #header>
      <a href="#/">Lorraine Commons</a>
    </template>

    <h1>Catalog</h1>
    <p>Everything without a name ends up in the default slot.</p>

    <template #footer>
      Wednesday 5 to 7 p.m., Saturday 10 a.m. to 1 p.m.
    </template>
  </PageLayout>
</template>
