<template>
  <section class="grid">
    <div v-for="(col, colIdx) in props.grid" :key="colIdx" class="grid__col">
      <div
        v-for="(row, rowIdx) in col"
        :key="stringifyCell({ row: rowIdx, col: colIdx })"
        class="grid__cell_container"
      >
        <div
          class="cell"
          :class="
            snakeSet?.has(stringifyCell({ row: rowIdx, col: colIdx }))
              ? 'cell--snake'
              : props?.apple?.col === colIdx && props?.apple?.row === rowIdx
              ? 'cell--apple'
              : ''
          "
        />
      </div>
    </div>
  </section>
</template>

<script setup>
  import { computed } from 'vue'
  import useGameStore from '../stores/game.ts'
  import { stringifyCell } from '../utils.ts'

  // definitions
  const { snake } = useGameStore()
  const props = defineProps({
    apple: {
      type: Object,
      required: true
    },
    grid: {
      type: Array,
      required: true
    }
  })

  // computed
  const snakeSet = computed(() => new Set(snake?.body?.map(stringifyCell)))
</script>

<style scoped lang="scss">
  @import '../assets/main.scss';

  $number_of_columns: 25;
  $cell_size: 20px;
  $gap_between_cells: 1px;

  .grid {
    display: grid;
    height: 550px; // change if the number_of_columns changes
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
      background-color: map-get($colors, bg3);
      height: $cell-size;
      width: $cell-size;
      border-radius: $radius;

      &--snake {
        background-color: map-get($colors, aqua);
      }
      &--apple {
        background-color: map-get($colors, red);
      }
    }
  }
</style>
