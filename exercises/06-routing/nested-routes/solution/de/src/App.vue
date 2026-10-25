<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
    <nav aria-label="Hauptnavigation">
      <RouterLink to="/">Katalog</RouterLink>
      <RouterLink to="/team">Team</RouterLink>
    </nav>
  </header>
  <div class="columns">
    <main>
      <RouterView />
    </main>
    <!-- A second, named place, empty when the route has nothing for it -->
    <RouterView name="aside" />
  </div>
</template>

<style scoped>
.site {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.5rem;
  align-items: baseline;
  margin: -1rem -1.5rem 1rem;
  padding: 0.75rem 1.5rem;
  background: #1f6b4f;
  color: #ffffff;
}
.brand {
  font-weight: 700;
}
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.site a {
  color: #ffffff;
}
/* Active on every page of the team, also below /team */
.site a.router-link-active {
  font-weight: 700;
}
.columns {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
}
main {
  flex: 1 1 24rem;
}
</style>
