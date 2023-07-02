<template>
  <nav class="navbar">
    <section class="navbar__stats">
      <div class="stat">
        <img
          :src="appleSvg"
          class="apple"
          :class="animateApple && 'apple--animated'"
        />
        {{ gameStore.eatenApples }}
      </div>
    </section>

    <section class="navbar__buttons">
      <GameButton
        :disabled="gameStore?.game?.state === GameState.Running"
        :text="gameStore?.game?.state === GameState.Over ? 'Restart' : 'Start'"
        :on-click="
          gameStore?.game?.state === GameState.Over
            ? reset
            : gameStore?.startGame
        "
      />
      <GameButton
        :disabled="gameStore?.game?.state !== GameState.Running"
        text="Pause"
        :on-click="gameStore?.pauseGame"
      />
    </section>

    <section class="navbar__stats">
      <p class="statsText">Highest score: {{ highestScore }}</p>
      <p class="statsText">Last score: {{ lastScore }}</p>
    </section>
  </nav>
</template>

<script setup>
  import { watch, ref, computed } from 'vue'
  import appleSvg from '../assets/svg/apple.svg'
  import useGameStore from '../stores/game.ts'
  import GameButton from './GameButton.vue'
  import { GameState } from '../models.ts'

  const gameStore = useGameStore()
  const currentEatenApples = ref(gameStore.eatenApples)
  const highestScore = ref(gameStore?.game?.highestScore)
  const lastScore = ref(gameStore?.game?.lastScore)

  const animateApple = computed(
    () => currentEatenApples.value !== gameStore.eatenApples
  )

  const reset = () => {
    gameStore.reset()
    gameStore.startGame()
  }

  watch(gameStore.game, () => {
    highestScore.value = gameStore?.game?.highestScore
    lastScore.value = gameStore?.game?.lastScore
  })

  watch(gameStore.snake, () => {
    if (currentEatenApples.value !== gameStore.eatenApples) {
      setTimeout(() => {
        currentEatenApples.value = gameStore.eatenApples
      }, 300)
    }
  })
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
      align-items: center;

      .statsText {
        font-weight: bold;
      }

      .stat {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        height: 100%;
        font-weight: bold;
        font-size: 1.5rem;
      }
    }

    &__buttons {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 1rem;
    }
  }

  .apple {
    width: 2rem;
    height: 2rem;
    transform: rotate(-25deg);

    &--animated {
      animation: shake 0.3s;
    }
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(-25deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(-26deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(-27deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(-26deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(-25deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-24deg);
    }
  }
</style>
