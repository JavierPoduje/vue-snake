<template>
  <button class="button" @click="onClick">{{ props?.text }}</button>
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
    }
  })
</script>

<style scoped lang="scss">
  @import '../assets/main.scss';

  .button {
    background-color: map-get($colors, bg4);
    color: map-get($colors, fg1);
    cursor: pointer;
    min-height: 36px;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: $radius;
  }
</style>
