import { GameState, type Cell, type GameStoreType } from '@/models'
import { defineStore } from 'pinia'

const useGameStore = defineStore<'gameStore', GameStoreType>('gameStore', {
  state: () => ({
    snake: [],
    game: {
      state: GameState.Pending
    }
  }),
  getters: {
    snakeSize(): number {
      return this?.snake?.length
    },
    eatenApples(): number {
      return this?.snake?.length - 2
    }
  },
  actions: {
    addCellToSnake(cell: Cell) {
      this?.snake?.push(cell)
    },
    startGame() {
      console.log('starting the game!')
      this.game.state = GameState.Running
    },
    finishGame() {
      this.game.state = GameState.Over
    }
  }
})

export default useGameStore
