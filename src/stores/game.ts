import { GameState, type GameStoreType, Direction } from '../models'
import {
  isClashedSnake,
  snakeAteApple,
  getNextSnakeBody,
  getNextApple
} from './helpers'
import useLocalStorage from '../composables/useLocalStorage'
import { defineStore } from 'pinia'

const { setItem, getItem } = useLocalStorage()

const useGameStore = defineStore<'gameStore', GameStoreType>('gameStore', {
  state: () => ({
    snake: {
      direction: Direction.Left,
      body: [
        { row: 10, col: 10 },
        { row: 11, col: 10 }
      ]
    },
    apple: { row: 10, col: 6 },
    game: {
      gridSize: 25,
      state: GameState.Pending,
      tickInterval: 270,
      highestScore: 0,
      lastScore: 0
    }
  }),
  getters: {
    snakeSize: ({ snake }: GameStoreType): number => snake?.body?.length,
    eatenApples: ({ snake }: GameStoreType): number => snake?.body?.length - 2
  },
  actions: {
    setHighestScore(score: number) {
      this.game.highestScore = score
    },
    setLastScore(score: number) {
      this.game.lastScore = score
    },
    startGame() {
      this.game.state = GameState.Running
    },
    reset() {
      this.snake.direction = Direction.Left
      this.snake.body = [
        { row: 10, col: 10 },
        { row: 11, col: 10 }
      ]
      this.game.tickInterval = 270
      this.apple = getNextApple(this.snake, this.game.gridSize)
    },
    pauseGame() {
      this.game.state = GameState.Pending
    },
    finishGame() {
      this.game.state = GameState.Over
    },
    changeDirection(direction: Direction) {
      const isOppositeDirection = {
        [Direction.Up]: Direction.Down,
        [Direction.Right]: Direction.Left,
        [Direction.Down]: Direction.Up,
        [Direction.Left]: Direction.Right
      }
      if (isOppositeDirection[direction] !== this.snake.direction) {
        this.snake.direction = direction
      }
    },
    tick() {
      // get the next body of the snake
      const nextSnakeBody = getNextSnakeBody(this.game, this.snake)

      if (isClashedSnake(nextSnakeBody)) {
        // if the snake died, finish the game
        this.game.state = GameState.Over

        if (this.game.state === GameState.Over) {
          const eatenApples = this.snake.body.length - 2
          setItem('lastScore', eatenApples.toString())
          this.game.lastScore = eatenApples
          if (eatenApples > parseInt(getItem('highestScore') || '0')) {
            setItem('highestScore', eatenApples.toString())
            this.game.highestScore = eatenApples
          }
        }
      }

      if (snakeAteApple(nextSnakeBody[0], this.apple)) {
        // if snake ate apple, add a cell to the snake and generate a new apple
        this.snake.body.unshift(this.apple)
        this.apple = getNextApple(this.snake, this.game.gridSize)
        this.game.tickInterval *= 0.95
      } else {
        // otherwise, just move the snake
        this.snake.body = nextSnakeBody
      }
    }
  }
})

export default useGameStore
