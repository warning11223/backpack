<script setup lang="ts">
import InventoryItem from '@/components/InventoryItem.vue'
import type { InventoryItemT } from '@/types/inventory-types.ts'
import { computed, isRef, type Ref } from 'vue'

interface InventoryGridProps {
  items: Ref<InventoryItemT[]> | InventoryItemT[]
}

const { items } = defineProps<InventoryGridProps>()

const itemsArray = isRef(items) ? items.value : items

const gridCols = 5

// Кол-во рядов на основе кол-ва предметов
const gridRows = computed(() => {
  const minRows = 8
  const itemsCount = itemsArray.length
  const neededRows = Math.ceil(itemsCount / gridCols)
  return Math.max(minRows, neededRows)
})

const getItemAtPosition = (row: number, col: number): InventoryItemT | null => {
  const index = row * gridCols + col
  return itemsArray?.[index] ?? null
}
</script>

<template>
  <div class="inventory-grid">
    <div
      v-for="row in gridRows"
      :key="'row-' + row"
      class="grid-row"
    >
      <div
        v-for="col in gridCols"
        :key="'cell-' + row + '-' + col"
        class="grid-cell"
      >
        <InventoryItem
          v-if="getItemAtPosition(row - 1, col - 1)"
          :items="items"
          :grid-cols="gridCols"
          :row="row"
          :col="col"
        />
        <div v-else class="item-slot"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inventory-grid {
  display: flex;
  flex-direction: column;
}

.grid-row {
  display: flex;
}

.grid-cell {
  width: 93px;
  height: 93px;
}

.item-slot {
  width: 100%;
  height: 100%;
  background-color: var(--dark);
  border: 1px solid var(--white-gray);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
