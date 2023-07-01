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
    color: map-get($colors, fg1);
    font-weight: bold;
    cursor: pointer;
    min-height: 36px;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: $radius;
    transition: all 0.03s ease-in-out;

    &:hover:not(&--disabled) {
      color: map-get($colors, fg);
      background-color: map-get($colors, bg2);
    }

    &--disabled {
      cursor: default;
      color: map-get($colors, fg3);
      background-color: map-get($colors, bg4);
    }
  }
</style>
