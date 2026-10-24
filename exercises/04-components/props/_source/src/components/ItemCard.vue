<script setup>
defineProps({
  name: { type: String, required: true },
  category: { type: String, required: true },
})
</script>

<template>
  <article class="card">
    <h2>{{ name }}</h2>
    <p class="category">{{ category }}</p>
    <p class="state">[%Verfügbar|Available%]</p>
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
p {
  margin: 0.25rem 0 0;
}
.category {
  color: #5f5f5f;
}
.state {
  font-weight: 600;
  color: #1f6b4f;
}
</style>