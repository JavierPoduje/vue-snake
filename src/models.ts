export enum GameState {
  Pending = 'Pending',
  Over = 'Over',
  Running = 'Running'
}

export interface Cell {
  row: number
  col: number
}

export type GameStoreType = {
  snake: Cell[]
  game: {
    state: GameState
  }
}
