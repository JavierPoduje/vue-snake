<template>
  <nav class="navbar">
    <GameButton text="Start" :onClick="gameStore?.startGame" />
  </nav>
</template>

<script setup>
  import useGameStore from '../stores/game.ts'
  import GameButton from './GameButton.vue'

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
