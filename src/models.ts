export enum GameState {
  Pending = 'Pending',
  Over = 'Over',
  Running = 'Running'
}

export interface Cell {
  row: number
  col: number
}

export enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}

export interface Snake {
  direction: Direction
  body: Cell[]
}

export interface Game {
    state: GameState
    gridSize: number

}

export type GameStoreType = {
  snake: Snake
  apple: Cell
  game: Game
}
