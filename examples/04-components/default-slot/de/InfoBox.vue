<template>
  <aside class="info">
    <!-- The content between the tags of InfoBox appears here, otherwise the fallback -->
    <slot>Zu diesem Ding gibt es keine Hinweise.</slot>
  </aside>
</template>

<style scoped>
.info {
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border-left: 4px solid #1f6b4f;
  background: #eef6f2;
}
</style>
