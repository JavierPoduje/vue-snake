import { Direction, type Cell, type Snake, type Game } from '@/models'

const stringifyCell = ({ row, col }: Cell): string => `${row}-${col}`

const getNextSnakeHead = (game: Game, snake: Snake): Cell => {
  const currentHead = snake.body[0]
  if (snake?.direction === Direction.Up) {
    const row = currentHead?.row - 1
    if (row < 0 || row >= game?.gridSize) {
      return { row: game?.gridSize - 1, col: currentHead?.col }
    } else {
      return { row, col: currentHead?.col }
    }
  } else if (snake?.direction === Direction.Right) {
    const col = currentHead?.col + 1
    if (col < 0 || col >= game?.gridSize) {
      return { row: currentHead?.row, col }
    } else {
      return { row: currentHead?.row, col: 0 }
    }
  } else if (snake?.direction === Direction.Down) {
    const row = currentHead?.row + 1
    if (row < 0 || row >= game?.gridSize) {
      return { row: 0, col: currentHead?.col }
    } else {
      return { row, col: currentHead?.col }
    }
  } else if (snake?.direction === Direction.Left) {
    const col = currentHead?.col - 1
    if (col < 0 || col >= game?.gridSize) {
      return { row: currentHead?.row, col }
    } else {
      return { row: currentHead?.row, col: game?.gridSize - 1 }
    }
  } else {
    throw new Error('Invalid direction')
  }
}

export const getRandomApple = (snake: Snake, gridSize: number): Cell => {
  const snakeSet = new Set(snake?.body?.map(stringifyCell))

  const apple = {
    row: Math.floor(Math.random() * gridSize),
    col: Math.floor(Math.random() * gridSize)
  }

  while (snakeSet?.has(apple)) {
    row = Math.floor(Math.random() * gridSize)
    col = Math.floor(Math.random() * gridSize)
  }

  return apple
}

export const isClashedSnake = (snake: Snake): boolean => {
  const snakeSet = new Set(snake?.body?.slice(1)?.map(stringifyCell))
  return snakeSet?.has(stringifyCell(snake?.body[0]))
}

export const snakeAteApple = (head: Cell, apple: Cell): boolean => {
  return head?.row === apple?.row && head?.col === apple?.col
}

export const getNextSnake = (game: Game, snake: Snake): Snake => {
  return [getNextSnakeHead(game, snake), ...snake.body.slice(0, -1)]
}
