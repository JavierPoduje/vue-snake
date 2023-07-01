import { Direction, type Cell, type Snake, type Game } from '@/models'

const stringifyCell = ({ row, col }: Cell): string => `${row}-${col}`

const getNextSnakeHead = (game: Game, snake: Snake): Cell => {
  const currentHead = snake.body[0]
  const direction = snake?.direction
  if (direction === Direction.Up) {
    const nextRow = currentHead.row - 1
    return {
      row: nextRow < 0 ? game.gridSize - 1 : nextRow,
      col: currentHead?.col
    }
  } else if (direction === Direction.Right) {
    const nextCol = currentHead.col + 1
    return {
      row: currentHead?.row,
      col: nextCol >= game.gridSize ? 0 : nextCol
    }
  } else if (direction === Direction.Down) {
    const nextRow = currentHead.row + 1
    return {
      row: nextRow >= game.gridSize ? 0 : nextRow,
      col: currentHead?.col
    }
  } else if (direction === Direction.Left) {
    const nextCol = currentHead.col - 1
    return {
      row: currentHead?.row,
      col: nextCol < 0 ? game.gridSize - 1 : nextCol
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
