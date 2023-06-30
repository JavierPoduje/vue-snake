import { Direction, type Cell, type Snake, type Game } from '@/models'

const stringifyCell = ({ row, col }: Cell): string => `${row}-${col}`

const getNextSnakeHead = (game: Game, snake: Snake): Cell => {
  const currentHead = snake.body[0]
  if (snake?.direction === Direction.Up) {
    return {
      col: currentHead?.col,
      row: row >= 0 ? currentHead?.row - 1 : game?.gridSize - 1
    }
  } else if (snake?.direction === Direction.Right) {
    return {
      row: currentHead?.row,
      col: col < game?.gridSize ? currentHead?.col + 1 : 0
    }
  } else if (snake?.direction === Direction.Down) {
    return {
      col: currentHead?.col,
      row: row < game?.gridSize ? 0 : currentHead?.row + 1
    }
  } else if (snake?.direction === Direction.Left) {
    return {
      row: currentHead?.row,
      col: col >= 0 ? currentHead?.col - 1 : game?.gridSize - 1
    }
  } else {
    throw new Error('Invalid direction')
  }
}

export const getRandomApple = (snake: Snake, gridSize: number): Cell => {
  const snakeSet = new Set(snake?.body?.map(stringifyCell))

  let apple = {
    row: Math.floor(Math.random() * gridSize),
    col: Math.floor(Math.random() * gridSize)
  }

  while (snakeSet?.has(apple)) {
    apple = {
      row: Math.floor(Math.random() * gridSize),
      col: Math.floor(Math.random() * gridSize)
    }
  }

  return apple
}

export const isClashedSnake = (snake: Snake): boolean => {
  const snakeSet = new Set(snake?.body?.slice(1)?.map(stringifyCell))
  return snake?.body ? snakeSet?.has(stringifyCell(snake?.body[0])) : false
}

export const snakeAteApple = (head: Cell, apple: Cell): boolean => {
  return head?.row === apple?.row && head?.col === apple?.col
}

export const getNextSnake = (game: Game, snake: Snake): Snake => {
  return [getNextSnakeHead(game, snake), ...snake.body.slice(0, -1)]
}
