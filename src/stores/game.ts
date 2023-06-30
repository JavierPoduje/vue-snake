import { GameState, type Cell, type GameStoreType, Direction } from '@/models'
import { isClashedSnake, snakeAteApple, getNextSnake } from './helpers'
import { defineStore } from 'pinia'

const useGameStore = defineStore<'gameStore', GameStoreType>('gameStore', {
  state: () => ({
    snake: {
      direction: Direction.Left,
      body: [
        { row: 10, col: 10 },
        { row: 11, col: 10 }
      ]
    },
    apple: { row: 3, col: 3 },
    game: {
      gridSize: 25,
      state: GameState.Pending
    }
  }),
  getters: {
    snakeSize(): number {
      return this?.snake?.body?.length
    },
    eatenApples(): number {
      return this?.snake?.body?.length - 2
    }
  },
  actions: {
    addCellToSnake(cell: Cell, snake: Snake): Snake {
      this.snake.body = [cell, ...snake]
    },
    changeDirection(direction: Direction) {
      this.snake.direction = direction
    },
    tick() {
      // get the next body of the snake
      const nextSnake = getNextSnake(this.game, this.snake)

      if (isClashedSnake(nextSnake)) {
        // if the snake died, finish the game
        return this.finishGame()
      }

      if (snakeAteApple(nextSnake[0], this.apple)) {
        // if snake ate apple, add a cell to the snake and generate a new apple
        this.addCellToSnake(this.apple, nextSnake)
        this.apple = getRandomApple(this.snake.body, this.game.gridSize)
      } else {
        // otherwise, just move the snake
        this.snake.body = nextSnake
      }
    },
    startGame() {
      this.game.state = GameState.Running
    },
    pauseGame() {
      this.game.state = GameState.Pending
    },
    finishGame() {
      this.game.state = GameState.Over
    }
  }
})

export default useGameStore
