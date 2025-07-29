<script setup lang="ts">

interface ErrorStateProps {
  error: string;
}

const { error } = defineProps<ErrorStateProps>()
</script>

<template>
  <div class="error-state">
    Error: {{ error }}
  </div>
</template>

<style scoped>
.error-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: var(--text-gray-47);
  font-size: 14px;
}

.error-state {
  color: var(--error);
}
</style>
