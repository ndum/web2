<script setup>
// Since Vue 3.5 destructured props stay reactive, the default moves into the destructuring
const { name, category, available = true } = defineProps({
  name: { type: String, required: true },
  category: { type: String, required: true },
  available: { type: Boolean },
})
</script>

<template>
  <article class="card">
    <h2>{{ name }}</h2>
    <p class="category">{{ category }}</p>
    <p v-if="available" class="state free">Available</p>
    <p v-else class="state lent">On loan</p>
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
