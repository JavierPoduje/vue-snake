<template>
  <nav class="navbar">
    <button @click="gameStore.startGame">Start</button>
  </nav>
</template>

<script setup>
  import useGameStore from '../stores/game.ts'

  const gameStore = useGameStore()
</script>

<style scoped lang="scss">
  @import '../assets/main.scss';

  .navbar {
    background-color: map-get($colors, gray);
    width: 100%;
    height: 50px;
    display: flex;
  }
</style>
