<template>
  <nav class="navbar">
    <GameButton text="Start" :on-click="gameStore?.startGame" />
    <GameButton text="Pause" :on-click="gameStore?.pauseGame" />
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
    padding: 3rem;
    background-color: map-get($colors, bg_s);
    width: 100%;
    display: flex;
  }
</style>
