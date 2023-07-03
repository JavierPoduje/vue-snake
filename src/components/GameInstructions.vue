<template>
  <section class="instructions">
    <!-- Change state -->
    <div class="instruction">
      <div
        class="keys__key keys__key--space"
        :class="spacePressed && 'keys__key--pressed'"
      >
        <img :src="spaceSvg" alt="space" class="space" />
      </div>
      <p class="instruction__text">:</p>
      <p class="instruction__text">Start / Pause</p>
    </div>

    <section class="keys">
      <div
        class="keys__key keys__key--arrow_up"
        :class="arrowUpPressed && 'keys__key--pressed'"
      >
        <img
          :src="arrowDownSvg"
          alt="up arrow"
          class="svg_arrow svg_arrow--up"
        />
      </div>
      <div
        class="keys__key keys__key--arrow_left"
        :class="arrowLeftPressed && 'keys__key--pressed'"
      >
        <img
          :src="arrowDownSvg"
          alt="left arrow"
          class="svg_arrow svg_arrow--left"
        />
      </div>
      <div
        class="keys__key keys__key--arrow_down"
        :class="arrowDownPressed && 'keys__key--pressed'"
      >
        <img
          :src="arrowDownSvg"
          alt="down arrow"
          class="svg_arrow svg_arrow--down"
        />
      </div>
      <div
        class="keys__key keys__key--arrow_right"
        :class="arrowRightPressed && 'keys__key--pressed'"
      >
        <img
          :src="arrowDownSvg"
          alt="right arrow"
          class="svg_arrow svg_arrow--right"
        />
      </div>
    </section>

    <section class="keys">
      <div
        class="keys__key keys__key--arrow_up"
        :class="keyWPressed && 'keys__key--pressed'"
      >
        <p alt="key W">W</p>
      </div>
      <div
        class="keys__key keys__key--arrow_left"
        :class="keyAPressed && 'keys__key--pressed'"
      >
        <p alt="key A">A</p>
      </div>
      <div
        class="keys__key keys__key--arrow_down"
        :class="keySPressed && 'keys__key--pressed'"
      >
        <p alt="key S">S</p>
      </div>
      <div
        class="keys__key keys__key--arrow_right"
        :class="keyDPressed && 'keys__key--pressed'"
      >
        <p alt="key D">D</p>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import spaceSvg from '../assets/svg/space.svg'
  import arrowDownSvg from '../assets/svg/arrow-down.svg'

  const arrowUpPressed = ref(false)
  const arrowRightPressed = ref(false)
  const arrowDownPressed = ref(false)
  const arrowLeftPressed = ref(false)
  const keyWPressed = ref(false)
  const keyDPressed = ref(false)
  const keySPressed = ref(false)
  const keyAPressed = ref(false)
  const spacePressed = ref(false)

  const refByKey = {
    arrowup: arrowUpPressed,
    arrowright: arrowRightPressed,
    arrowdown: arrowDownPressed,
    arrowleft: arrowLeftPressed,
    w: keyWPressed,
    d: keyDPressed,
    s: keySPressed,
    a: keyAPressed,
    ' ': spacePressed
  }

  const handleKeyDown = (event) => {
    const key = event.key.toLowerCase()
    if (refByKey[key]) {
      refByKey[key].value = true
    }
  }

  const handleKeyUp = (event) => {
    const key = event.key.toLowerCase()
    if (refByKey[key]) {
      refByKey[key].value = false
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
  })
</script>

<style scoped lang="scss">
  @import '../assets/main.scss';

  .instructions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

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
    justify-self: center;
  }

  .svg_arrow {
    width: 2rem;
    height: 2rem;
    justify-self: center;
    &--up {
      transform: rotate(180deg);
    }
    &--right {
      transform: rotate(-90deg);
    }
    &--left {
      transform: rotate(90deg);
    }
  }

  .keys {
    display: grid;
    grid-template-areas:
      '. up .'
      'left down right';
    row-gap: 0.8rem;
    width: 8rem;

    &__key {
      color: map-get($colors, bg);
      font-weight: bold;
      width: 2rem;
      height: 2rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: box-shadow 0.3s ease, transform 0.15s ease;
      background: -webkit-linear-gradient(
        top,
        #f9f9f9 0%,
        #d2d2d2 80%,
        #c0c0c0 100%
      );
      box-shadow: 0 0 1px #888, 0 1px 0 #fff, 0 6px 0 #c0c0c0,
        0 8px 17px rgba(#444, 0.4), 2px 1px 4px rgba(#444, 0.25),
        -2px 1px 4px rgba(#444, 0.25), 0 9px 16px rgba(#444, 0.1);

      &--arrow_up {
        grid-area: up;
      }
      &--arrow_right {
        grid-area: right;
      }
      &--arrow_down {
        grid-area: down;
      }
      &--arrow_left {
        grid-area: left;
      }
      &--space {
        width: 6rem;
      }

      p {
        font-size: 1rem;
        font-weight: bold;
      }

      &--pressed {
        box-shadow: 0 0 1px #888, 0 1px 0 #fff, 0 4px 0 #c0c0c0,
          0 2px 35px rgba(#444, 0.3), 2px 2px 4px rgba(#444, 0.25),
          -2px 2px 4px rgba(#444, 0.25), 0 7px 4px rgba(#444, 0.1);
        transform: translateY(2px);
      }
    }
  }
</style>
