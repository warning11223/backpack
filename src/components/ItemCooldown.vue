<script setup lang="ts">
import IconTimer from '@/components/icons/IconTimer.vue'
import type { InventoryItemT } from '@/types/inventory-types.ts'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

interface Props {
  row: number
  col: number
  getItemAtPosition: (row: number, col: number) => InventoryItemT | null
}

const props = defineProps<Props>()

const cooldownTimer = ref<number | null>(null)
const now = ref(Date.now())

// Получаем текущий предмет
const currentItem = computed(() =>
  props.getItemAtPosition(props.row - 1, props.col - 1)
)

// Проверяем есть ли кулдаун у предмета
const hasCooldown = computed(() => {
  if (!currentItem.value?.cooldown) return false
  return currentItem.value.cooldown > now.value
})

// Вычисляем оставшееся время кулдауна в секундах
const remainingSeconds = computed(() => {
  if (!currentItem.value?.cooldown || !hasCooldown.value) return 0
  return Math.max(0, Math.ceil((currentItem.value.cooldown - now.value) / 1000))
})

const formattedCooldown = computed(() => `${remainingSeconds.value}s`)

const startTimer = () => {
  if (cooldownTimer.value) return

  cooldownTimer.value = setInterval(() => {
    now.value = Date.now()
  }, 1000)
}

const stopTimer = () => {
  if (cooldownTimer.value) {
    clearInterval(cooldownTimer.value)
    cooldownTimer.value = null
  }
}

watch(hasCooldown, (hasCD) => {
  if (hasCD) {
    startTimer()
  } else {
    stopTimer()
  }
}, { immediate: true })

watch(currentItem, () => {
  now.value = Date.now()
}, { immediate: true })

onMounted(() => {
  now.value = Date.now()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<template>
  <div
    v-if="hasCooldown"
    class="item-cooldown"
  >
    <IconTimer />
    {{ formattedCooldown }}
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
