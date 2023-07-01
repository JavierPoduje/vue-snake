<template>
  <nav class="navbar">
    <section class="navbar__stats">
      <p class="statsText">Eaten apples: {{ gameStore.eatenApples }}</p>
      <p class="statsText">State: {{ gameStore.game.state }}</p>
    </section>
    <section class="navbar__buttons">
      <GameButton
        :disabled="gameStore?.game?.state === GameState.Running"
        :text="gameStore?.game?.state === GameState.Over ? 'Restart' : 'Start'"
        :on-click="gameStore?.startGame"
      />
      <GameButton
        :disabled="gameStore?.game?.state !== GameState.Running"
        text="Pause"
        :on-click="gameStore?.pauseGame"
      />
    </section>
  </nav>
</template>

<script setup>
  import { GameState } from '../models.ts'
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

      .statsText {
        font-weight: bold;
      }
    }

    &__buttons {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 1rem;
    }
  }
</style>
