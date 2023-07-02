<template>
  <main class="main">
    <GameNavbar />
    <section class="main__game">
      <GameGrid :apple="gameStore?.apple" :grid="grid" />
      <GameInstructions />
    </section>
  </main>
</template>

<script setup lang="ts">
  import { watchEffect, ref, onMounted } from 'vue'
  import useLocalStorage from './composables/useLocalStorage'
  import useGameStore from './stores/game.ts'
  import GameNavbar from './components/GameNavbar.vue'
  import GameGrid from './components/GameGrid.vue'
  import GameInstructions from './components/GameInstructions.vue'
  import { GameState, Direction } from './models.ts'

  const gameStore = useGameStore()
  const { setItem, getItem } = useLocalStorage()
  const looping = ref(false)

  const loop = () => {
    gameStore.tick()

    // if the game change its state, stop the loop
    if (gameStore.game.state === GameState.Running) {
      setTimeout(loop, gameStore.game.tickInterval)
    } else {
      looping.value = false
    }
  }

  const onKeyDown = (e) => {
    const key = e?.key?.toLowerCase()
    switch (key) {
      case 'w':
      case 'arrowup':
        gameStore.changeDirection(Direction.Up)
        break
      case 'd':
      case 'arrowright':
        gameStore.changeDirection(Direction.Right)
        break
      case 's':
      case 'arrowdown':
        gameStore.changeDirection(Direction.Down)
        break
      case 'a':
      case 'arrowleft':
        gameStore.changeDirection(Direction.Left)
        break
      case ' ':
        if (gameStore.game.state === GameState.Running) {
          gameStore.pauseGame()
        } else {
          gameStore.startGame()
        }
        break
      default:
        break
    }
  }

  // on mounted, handle keyboard events
  onMounted(() => {
    window.addEventListener('keydown', onKeyDown)
    gameStore.setHighestScore(parseInt(getItem('highestScore') ?? 0))
    gameStore.setLastScore(parseInt(getItem('lastScore') ?? 0))
  })

  // refs
  const grid = ref(
    new Array(gameStore.game.gridSize)
      .fill()
      .map(() =>
        new Array(gameStore.game.gridSize).fill().map((_, colIdx) => colIdx)
      )
  )

  // watch for the game state to change and save the highest highestScore
  watchEffect(() => {
    if (gameStore.game.state === GameState.GameOver) {
      setItem('lastScore', gameStore.eatenApples)
      if (gameStore.eatenApples > parseInt(gameStore.highestScore)) {
        setItem('highestScore', gameStore.lastScore)
      }
    }
  })

  // start the game loop
  watchEffect(() => {
    if (gameStore.game.state === GameState.Running && !looping.value) {
      looping.value = true
      loop()
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

    &__game {
      display: flex;
      gap: 5rem;
      align-items: center;
      justify-content: center;
    }
  }
</style>
