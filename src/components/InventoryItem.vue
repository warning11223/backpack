<script setup lang="ts">
import ItemCooldown from '@/components/ItemCooldown.vue'
import type { InventoryItemT } from '@/types/inventory-types.ts'
import CursorTooltip from '@/components/CursorTooltip.vue'
import { isRef, type Ref, ref } from 'vue'

interface InventoryItemProps {
  row: number
  col: number
  items: Ref<InventoryItemT[]> | InventoryItemT[]
  gridCols: number
}

const { gridCols, col, row, items } = defineProps<InventoryItemProps>()

const tooltipVisible = ref(false)
const tooltipContent = ref('')
const tooltipX = ref(0)
const tooltipY = ref(0)
const tooltipType = ref<string>('')

// Получаем предмет по позиции в сетке
const getItemAtPosition = (row: number, col: number): InventoryItemT | null => {
  const itemsArray = isRef(items) ? items.value : items
  const index = row * gridCols + col
  return itemsArray?.[index] ?? null
}

// Форматируем отображение количества
const formatCount = (item: InventoryItemT): string => {
  if (item.count && item.count > 1) {
    return `x${item.count}`
  }
  return ''
}

const showTooltip = (event: MouseEvent, item: InventoryItemT) => {
  tooltipContent.value = item.name
  tooltipType.value = item.type
  tooltipVisible.value = true
  updateTooltipPosition(event)
}

const updateTooltipPosition = (event: MouseEvent) => {
  if (!tooltipVisible.value) return

  const offsetX = 15
  const offsetY = 20

  let x = event.clientX + offsetX
  let y = event.clientY + offsetY

  if (x + 200 > window.innerWidth) {
    x = event.clientX - 200 - offsetX
  }
  if (y < 0) {
    y = event.clientY + 30
  }

  tooltipX.value = x
  tooltipY.value = y
}

const hideTooltip = () => {
  tooltipVisible.value = false
}
</script>

<template>
  <div
    class="item-slot"
    :class="{
       'armor': getItemAtPosition(row - 1, col - 1)!.type === 'armor',
       'weapon': getItemAtPosition(row - 1, col - 1)!.type === 'weapon',
    }"
    @mouseenter="showTooltip($event, getItemAtPosition(row - 1, col - 1)!)"
    @mousemove="updateTooltipPosition"
    @mouseleave="hideTooltip"
  >
    <img
      :src="getItemAtPosition(row - 1, col - 1)!.imageUrl"
      :alt="getItemAtPosition(row - 1, col - 1)!.name"
      class="item-image"
    />

    <div
      v-if="formatCount(getItemAtPosition(row - 1, col - 1)!)"
      class="item-quantity"
    >
      {{ formatCount(getItemAtPosition(row - 1, col - 1)!) }}
    </div>

    <div
      v-if="getItemAtPosition(row - 1, col - 1)!.charges"
      class="charges-triangle"
    ></div>

    <div
      v-if="getItemAtPosition(row - 1, col - 1)!.charges"
      class="charges-triangle-text"
    >
      {{ getItemAtPosition(row - 1, col - 1)!.charges }}/{{ getItemAtPosition(row - 1, col - 1)!.maxCharges }}
    </div>

    <ItemCooldown
      :row="row"
      :col="col"
      :get-item-at-position="getItemAtPosition"
    />
  </div>

  <CursorTooltip
    :tooltip-visible="tooltipVisible"
    :tooltip-x="tooltipX"
    :tooltip-y="tooltipY"
    :tooltip-content="tooltipContent"
  />
</template>

<style scoped>
.item-image {
  width: 80%;
  height: 80%;
  object-fit: contain;
}

.item-quantity {
  position: absolute;
  bottom: 3px;
  right: 5px;
  color: rgb(255, 255, 255);
  font-family: 'Apercu';
  font-size: 17px;
  font-weight: 500;
  line-height: 17px;
}

.charges-triangle {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 60px solid rgba(6, 6, 6, 0.65);
  border-bottom: 42px solid transparent;
  z-index: 5;
}

.charges-triangle-text {
  position: absolute;
  top: 4px;
  left: 3px;
  z-index: 6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  color: rgb(255, 255, 255);
  font-family: 'Apercu';
  font-size: 17px;
  font-weight: 500;
  line-height: 17px;
  text-align: left;
}

.item-slot {
  width: 100%;
  height: 100%;
  background-color: rgb(26, 26, 26);
  border: 1px solid rgb(69, 69, 69);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &.weapon {
    background: radial-gradient(59.01% 59.01% at 50% 50%,rgb(127, 89, 206),rgba(127, 89, 206, 0) 100%),rgb(26, 26, 26);
  }

  &.armor {
    background: radial-gradient(59.01% 59.01% at 50% 50%,rgb(54, 124, 206),rgba(0, 95, 206, 0) 100%),rgb(26, 26, 26);
  }
}
</style>
