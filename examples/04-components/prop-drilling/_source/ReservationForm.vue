<script setup>
import { ref } from 'vue'

const props = defineProps({ member: { type: Object, required: true } })

const memberNumber = ref(props.member.number)
</script>

<template>
  <label for="member">[%Mitgliedernummer|Member number%]</label>
  <input id="member" v-model="memberNumber">
</template>
