<template>
  <nav class="navbar">
    <section class="navbar__stats">
      <p>Eaten apples: {{ gameStore.eatenApples }}</p>
      <p>State: {{ gameStore.game.state }}</p>
    </section>
    <section class="navbar__buttons">
      <GameButton text="Start" :on-click="gameStore?.startGame" />
      <GameButton text="Pause" :on-click="gameStore?.pauseGame" />
    </section>
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
    padding: 2rem 8rem;
    background-color: map-get($colors, bg_s);
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-radius: $radius;

    &__stats {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__buttons {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 1rem;
    }
  }
</style>
