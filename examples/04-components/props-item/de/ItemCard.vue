<script setup>
defineProps({
  item: { type: Object, required: true },
})
</script>

<template>
  <article class="card">
    <h2>{{ item.name }}</h2>
    <p class="category">{{ item.category }}</p>
    <p v-if="item.available" class="state free">Verfügbar</p>
    <p v-else class="state lent">Ausgeliehen</p>
  </article>
</template>

<style scoped>
.card {
  padding: 0.75rem 1rem;
  border: 1px solid #c8c8c8;
  border-radius: 8px;
}
h2 {
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
}
.category {
  margin: 0;
  color: #5f5f5f;
}
.state {
  margin: 0.5rem 0 0;
  font-weight: 600;
}
.free {
  color: #1f6b4f;
}
.lent {
  color: #a3341f;
}
</style>
