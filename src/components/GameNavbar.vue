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

    <section class="navbar__stats">
      <p class="statsText">Highest score: {{ highestScore }}</p>
      <p class="statsText">Last score: {{ lastScore }}</p>
    </section>
  </nav>
</template>

<script setup lang="ts">
  import { watch, ref, computed } from 'vue'
  import appleSvg from '../assets/svg/apple.svg'
  import useGameStore from '../stores/game'

  const gameStore = useGameStore()
  const currentEatenApples = ref(gameStore.eatenApples)
  const highestScore = ref(gameStore?.game?.highestScore)
  const lastScore = ref(gameStore?.game?.lastScore)

  const animateApple = computed(
    () => currentEatenApples.value !== gameStore.eatenApples
  )

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
    padding: 2rem;
    background-color: map-get($colors, bg_s);
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-radius: $radius;
    max-width: 790.52px;

    &__stats {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;

      .statsText {
        font-weight: bold;
      }

      .stat {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        width: 80%;
        height: 100%;
        font-weight: bold;
        font-size: 1.5rem;
      }
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
