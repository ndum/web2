<script setup>
import LoanRow from '@/components/LoanRow.vue'
import NoteList from '@/components/NoteList.vue'
import OverdueList from '@/components/OverdueList.vue'
import { NOTES } from '@/notes.js'
import { useLoansStore } from '@/stores/loans.js'

const { loans, reminded, load } = useLoansStore()
const today = new Date().toISOString().slice(0, 10)

load()
</script>

<template>
  <h1>Team at the counter</h1>
  <OverdueList :loans="loans" :today="today" />
  <h2>All loans</h2>
  <ul class="loans">
    <LoanRow v-for="loan in loans" :key="loan.id" :loan="loan" :reminded="reminded.includes(loan.id)" />
  </ul>
  <NoteList :notes="NOTES" />
</template>
