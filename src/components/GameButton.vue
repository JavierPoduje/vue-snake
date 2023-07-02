<template>
  <button
    :class="props.disabled && 'button--disabled'"
    :disabled="props.disabled"
    class="button"
    @click="onClick"
  >
    {{ props?.text }}
  </button>
</template>

<script setup>
  const props = defineProps({
    text: {
      type: String,
      required: true
    },
    onClick: {
      type: Function,
      required: true
    },
    disabled: {
      type: Boolean,
      default: true
    }
  })
</script>

<style scoped lang="scss">
  @import '../assets/main.scss';

  .button {
    background-color: map-get($colors, bg1);
    border-radius: $radius;
    border: none;
    color: map-get($colors, fg1);
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    height: 46px;
    outline: none;
    padding: 0.5rem 1rem;
    transition: all 0.03s ease-in-out;

    &:hover:not(&--disabled) {
      background-color: map-get($colors, bg2);
      color: map-get($colors, fg);
    }

    &--disabled {
      background-color: map-get($colors, bg4);
      color: map-get($colors, fg3);
      cursor: default;
    }
  }
</style>
