<script setup lang="ts">
interface TooltipProps {
  tooltipVisible: boolean
  tooltipX: number
  tooltipY: number
  tooltipContent: string
}

const { tooltipX, tooltipVisible, tooltipY, tooltipContent } = defineProps<TooltipProps>()
</script>

<template>
  <div
    v-if="tooltipVisible"
    class="tooltip cursor-tooltip"
    :style="{
        left: tooltipX + 'px',
        top: tooltipY + 'px'
      }"
  >
    {{ tooltipContent }}
  </div>
</template>

<style scoped>
.tooltip.cursor-tooltip {
  position: fixed;
  padding: 4px 8px;
  background-color: var(--dark-gray);
  border: 1px solid var(--border-gray);
  color: var(--text-white);
  font-size: 12px;
  border-radius: 8px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1000;
  transition: none;
}

.tooltip:not(.cursor-tooltip) {
  display: none;
}
</style>
