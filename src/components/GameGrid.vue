<template>
  <section class="grid">
    <div v-for="(row, rowIdx) in grid" :key="rowIdx" class="grid__col">
      <div
        v-for="(col, colIdx) in row"
        :key="`${rowIdx}-${colIdx}`"
        class="grid__cell_container"
      >
        <div
          class="cell"
          :class="snakeSet.has(`${colIdx}-${rowIdx}`) && 'cell--snake'"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
  import { computed } from 'vue'
  import useGameStore from '../stores/game.ts'

  const gameStore = useGameStore()
  const snakeSet = computed(
    () => new Set(gameStore?.snake?.map(({ col, row }) => `${col}-${row}`))
  )

  const numberOfColumns = 25
  const grid = new Array(numberOfColumns)
    .fill()
    .map(() => new Array(numberOfColumns).fill().map((_, colIdx) => colIdx))
</script>

<style scoped lang="scss">
  @import '../assets/main.scss';

  $number_of_columns: 25;
  $cell_size: 20px;
  $gap_between_cells: 1px;

  .grid {
    display: grid;
    grid-template-columns: repeat($number_of_columns, 1fr);
    grid-template-rows: repeat($number_of_columns, 1fr);

    &__cell_container {
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: $gap_between_cells;
    }

    .cell {
      background-color: map-get($colors, green);
      height: $cell-size;
      width: $cell-size;

      &--snake {
        background-color: map-get($colors, red);
      }
    }
  }
</style>
