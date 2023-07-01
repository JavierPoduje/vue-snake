import { Direction, type Cell, type Snake, type Game } from '@/models'

const stringifyCell = ({ row, col }: Cell): string => `${row}-${col}`

const getNextSnakeHead = (game: Game, snake: Snake): Cell => {
  const currentHead = snake.body[0]
  if (snake?.direction === Direction.Up) {
    const row = currentHead?.row - 1
    return {
      col: currentHead?.col,
      row: row >= 0 ? row : game?.gridSize - 1
    }
  } else if (snake?.direction === Direction.Right) {
    const col = currentHead?.col + 1
    return {
      row: currentHead?.row,
      col: col < game?.gridSize ? col : 0
    }
  } else if (snake?.direction === Direction.Down) {
    const row = currentHead?.row + 1
    return {
      col: currentHead?.col,
      row: row < game?.gridSize ? 0 : row
    }
  } else if (snake?.direction === Direction.Left) {
    const col = currentHead?.col - 1
    return {
      row: currentHead?.row,
      col: col >= 0 ? col : game?.gridSize - 1
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

  while (snakeSet?.has(stringifyCell(apple))) {
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

export const getNextSnakeBody = (game: Game, snake: Snake): Snake['body'] => {
  const nextHead = getNextSnakeHead(game, snake)
  return [nextHead, ...snake.body.slice(0, -1)]
}
