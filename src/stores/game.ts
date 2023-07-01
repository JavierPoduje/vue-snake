import {
  GameState,
  type Cell,
  type GameStoreType,
  Direction,
  type Snake
} from '../models'
import { isClashedSnake, snakeAteApple, getNextSnakeBody } from './helpers'
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
    snakeSize: ({ snake }: GameStoreType): number => snake?.body?.length,
    eatenApples: ({ snake }: GameStoreType): number => snake?.body?.length - 2
  },
  actions: {
    startGame() {
      this.game.state = GameState.Running
    },
    pauseGame() {
      this.game.state = GameState.Pending
    },
    finishGame() {
      this.game.state = GameState.Over
    },
    addCellToSnake(cell: Cell, snake: Snake) {
      this.snake.body = [cell, ...snake.body]
    },
    changeDirection(direction: Direction) {
      this.snake.direction = direction
    },
    tick() {
      // get the next body of the snake
      const nextSnakeBody = getNextSnakeBody(this.game, this.snake)

      if (isClashedSnake(nextSnakeBody)) {
        // if the snake died, finish the game
        return this.finishGame()
      }

      if (snakeAteApple(nextSnakeBody[0], this.apple)) {
        // if snake ate apple, add a cell to the snake and generate a new apple
        this.addCellToSnake(this.apple, nextSnakeBody)
        this.apple = getRandomApple(this.snake.body, this.game.gridSize)
      } else {
        // otherwise, just move the snake
        this.snake.body = nextSnakeBody
      }
    }
  }
})

export default useGameStore
