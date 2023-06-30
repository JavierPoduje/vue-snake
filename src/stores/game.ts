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
      // 1. calculate the next position of the snake
      const nextSnake = getNextSnake(this.game, this.snake)

      // 2. check if the snake died
      if (isClashedSnake(nextSnake)) {
        return this.finishGame()
      }

      // 3. check if the snake ate the apple
      const head = nextSnake[0]
      if (snakeAteApple(head, this.apple)) {
        this.addCellToSnake(head, nextSnake)
        this.apple = getRandomApple(this.snake.body, this.game.gridSize)
      }
    },
    // Todo: not implemented
    startGame() {
      this.game.state = GameState.Running
    },
    // Todo: not implemented
    finishGame() {
      this.game.state = GameState.Over
    }
  }
})

export default useGameStore
