<template>
  <main class="main">
    <GameNavbar />
    <GameGrid />
  </main>
</template>

<script setup lang="ts">
  import GameNavbar from './components/GameNavbar.vue'
  import GameGrid from './components/GameGrid.vue'
</script>

<style scoped lang="scss">
  .main {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    justify-content: center;
    width: 100%;
  }
</style>
