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
  color: #aaa;
  font-size: 14px;
}

.error-state {
  color: #ff6b6b;
}
</style>
