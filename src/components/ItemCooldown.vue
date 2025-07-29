<script setup lang="ts">
import IconTimer from '@/components/icons/IconTimer.vue'
import type { InventoryItemT } from '@/types/inventory-types.ts'
import { onMounted, onUnmounted, ref } from 'vue'

interface Props {
  row: number
  col: number
  getItemAtPosition: (row: number, col: number) => InventoryItemT | null
}

const { row, getItemAtPosition, col } = defineProps<Props>()

const cooldownTimer = ref<number | null>(null)
const now = ref(Date.now())

// Проверяем есть ли кулдаун у предмета
const hasCooldown = (item: InventoryItemT): boolean => {
  return item.cooldown ? item.cooldown > Date.now() : false
}

// Вычисляем оставшееся время кулдауна
const getRemainingCooldown = (cooldownTimestamp: number): number => {
  return Math.max(0, Math.floor((cooldownTimestamp - now.value) / 1000))
}

// Форматируем время кулдауна
const formatCooldown = (cooldownTimestamp: number): string => {
  const seconds = getRemainingCooldown(cooldownTimestamp)

  return `${seconds}s`
}

// Обновляем текущее время каждую секунду
const startCooldownTimer = () => {
  cooldownTimer.value = setInterval(() => {
    now.value = Date.now()
  }, 1000)
}

onMounted(() => {
  startCooldownTimer()
})

onUnmounted(() => {
  if (cooldownTimer.value) {
    clearInterval(cooldownTimer.value)
  }
})
</script>

<template>
  <div
    v-if="hasCooldown(getItemAtPosition(row - 1, col - 1)!)"
    class="item-cooldown"
  >
    <IconTimer />
    {{ formatCooldown(getItemAtPosition(row - 1, col - 1)!.cooldown!) }}
  </div>
</template>

<style scoped>
.item-cooldown {
  font-family: 'Apercu';
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--text-white);
  font-size: 17px;
  font-weight: bold;

  padding: 2px 6px;
  border-radius: 4px;
  z-index: 22;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--black-50);
    z-index: -1;
  }
}

</style>
