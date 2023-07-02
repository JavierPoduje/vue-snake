<template>
  <section>
    <!-- Change state -->
    <div class="instruction">
      <img :src="spaceSvg" alt="space" class="space" />
      <p class="instruction__text">:</p>
      <p class="instruction__text">Start / Pause</p>
    </div>

    <!-- Move up -->
    <div class="instruction">
      <p class="instruction__text">
        W or <img :src="arrowDownSvg" alt="up arrow" class="arrow_up" />
      </p>
      <p class="instruction__text">:</p>
      <p class="instruction__text">Move up</p>
    </div>

    <!-- Move left -->
    <div class="instruction">
      <p class="instruction__text">
        A or <img :src="arrowDownSvg" alt="left arrow" class="arrow_left" />
      </p>
      <p class="instruction__text">:</p>
      <p class="instruction__text">Move left</p>
    </div>

    <!-- Move right -->
    <div class="instruction">
      <p class="instruction__text">
        D or <img :src="arrowDownSvg" alt="right arrow" class="arrow_right" />
      </p>
      <p class="instruction__text">:</p>
      <p class="instruction__text">Move right</p>
    </div>

    <!-- Move down -->
    <div class="instruction">
      <p class="instruction__text">
        S or <img :src="arrowDownSvg" alt="down arrow" class="arrow_down" />
      </p>
      <p class="instruction__text">:</p>
      <p class="instruction__text">Move down</p>
    </div>
  </section>
</template>

<script setup lang="ts">
  import spaceSvg from '../assets/svg/space.svg'
  import arrowDownSvg from '../assets/svg/arrow-down.svg'
</script>

<style scoped lang="scss">
  .instruction {
    display: grid;
    grid-template-columns: 3fr 1fr 3fr;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    &__text {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }

  .space {
    width: 2rem;
    height: 2rem;
    transform: rotate(15deg);
    justify-self: center;
  }

  .arrow_up {
    width: 2rem;
    height: 2rem;
    justify-self: center;
    transform: rotate(180deg);
  }

  .arrow_left {
    width: 2rem;
    height: 2rem;
    justify-self: center;
    transform: rotate(90deg);
  }

  .arrow_down {
    width: 2rem;
    height: 2rem;
    justify-self: center;
  }

  .arrow_right {
    width: 2rem;
    height: 2rem;
    justify-self: center;
    transform: rotate(-90deg);
  }
</style>
