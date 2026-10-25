<script setup>
defineProps({ items: { type: Array, required: true } })

const emit = defineEmits(['remove'])
</script>

<template>
  <section>
    <h2>Favoriten</h2>
    <ul v-if="items.length > 0" class="favorites">
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
        <button type="button" class="remove" @click="emit('remove', item.id)">✕</button>
      </li>
    </ul>
    <p v-else>Noch keine Favoriten.</p>
  </section>
</template>
