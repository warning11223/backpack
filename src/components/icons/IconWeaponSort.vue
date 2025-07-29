<template>
  <svg
    width="33"
    height="32"
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :fill="currentColor"
      d="M7.94 17.96L14.05 24.06L11.6 26.5L14.05 28.94L11.61 31.38L7.33 27.11L2.44 32L0 29.55L4.88 24.67L0.61 20.4L3.05 17.96L5.49 20.4L7.94 17.96ZM0.94 0L7.07 0L27.49 20.4L29.94 17.96L32.38 20.4L28.11 24.67L33 29.55L30.55 32L25.66 27.11L21.39 31.38L18.94 28.94L21.38 26.5L0.94 6.09L0.94 0ZM25.93 0L32.05 0L32.05 6.08L25.05 13.08L18.94 6.97L25.93 0L25.93 0Z"
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
