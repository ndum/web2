<script setup>
import PageLayout from './PageLayout.vue'
</script>

<template>
  <PageLayout>
    <template #header>
      <a href="#/">Lorraine Commons</a>
    </template>

    <h1>[%Katalog|Catalog%]</h1>
    <p>[%Alles ohne Namen landet im Standard-Slot.|Everything without a name ends up in the default slot.%]</p>

    <template #footer>
      [%Mittwoch 17 bis 19 Uhr, Samstag 10 bis 13 Uhr|Wednesday 5 to 7 p.m., Saturday 10 a.m. to 1 p.m.%]
    </template>
  </PageLayout>
</template>
