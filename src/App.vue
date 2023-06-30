<template>
  <main class="main">
    <GameNavbar />
    <GameGrid />
  </main>
</template>

<script setup lang="ts">
  import { watchEffect } from 'vue'
  import useGameStore from './stores/game.ts'
  import GameNavbar from './components/GameNavbar.vue'
  import GameGrid from './components/GameGrid.vue'
  import { GameState } from './models.ts'

  const gameStore = useGameStore()

  const localTick = () => {
    gameStore.tick()
    setTimeout(localTick, 500)
  }

  // after the user clicks start, start the game loop
  watchEffect(() => {
    if (gameStore.game.state === GameState.Running) {
      localTick()
    }
  })
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
