<template>
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    class="icon-cross"
  >
    <path
      :fill="currentColor"
      d="M28 4.66L23.33 0L13.99 9.33L4.66 0L0 4.66L9.33 14L0 23.33L4.66 28L13.99 18.66L23.33 28L28 23.33L18.66 14L28 4.66Z"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  currentColor: {
    type: String,
    default: 'currentColor'
  }
})
</script>

<style scoped>
.icon-cross {
  display: block;
}
</style>
