<template>
  <button class="button" @click="onClick">{{ props?.text }}</button>
</template>

<script setup>
  const props = defineProps(['text', 'onClick'])
</script>

<style scoped lang="scss">
  @import '../assets/main.scss';

  .button {
    background-color: map-get($colors, green);
    cursor: pointer;
    min-height: 36px;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: $radius;
  }
</style>
