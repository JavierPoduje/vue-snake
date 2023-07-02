export enum GameState {
  Pending = 'Pending',
  Over = 'Over',
  Running = 'Running'
}

export enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}

export interface Cell {
  row: number
  col: number
}

export interface Snake {
  direction: Direction
  body: Cell[]
}

export interface Game {
  state: GameState
  gridSize: number
  tickInterval: number
  highestScore: number
  lastScore: number
}

export type GameStoreType = {
  snake: Snake
  apple: Cell
  game: Game
}
