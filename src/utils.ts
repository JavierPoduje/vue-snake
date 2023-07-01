import type { Cell } from './models'

export const stringifyCell = ({ row, col }: Cell): string => `${row}-${col}`
