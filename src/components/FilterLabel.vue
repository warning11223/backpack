<script setup lang="ts">
import { computed, isRef, type Ref } from 'vue'
import type { InventoryItemT } from '@/types/inventory-types.ts'

interface InventoryContentProps {
  items: Ref<InventoryItemT[]> | InventoryItemT[]
  activeFilter: 'all' | 'armor' | 'weapon' | 'misc'
  allItems: InventoryItemT[]
}

const {items, allItems, activeFilter} = defineProps<InventoryContentProps>()

const itemsArray = isRef(items) ? items.value : items

// Кол-во предметов
const itemCount = computed(() => itemsArray.length)

// Заголовок для текущего фильтра
const getFilterTitle = (): string => {
  switch (activeFilter) {
    case 'all': return 'ALL ITEMS'
    case 'armor': return 'ARMOR'
    case 'weapon': return 'WEAPONS'
    case 'misc': return 'MISCELLANEOUS'
    default: return 'ALL ITEMS'
  }
}
</script>

<template>
  <div class="inventory-header-text">
    <span>{{ getFilterTitle() }}</span>
    <span class="item-count">{{ itemCount }}/{{allItems.length}}</span>
  </div>
</template>

<style scoped>
.inventory-header-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 22px;
  font-weight: bold;
  font-size: 14px;

  span:first-child {
    color: rgb(255, 255, 255);
    font-size: 20px;
    font-weight: 800;
    line-height: 25px;
    text-transform: uppercase;
  }
  span:nth-child(2) {
    color: rgb(255, 255, 255);
    font-family: 'Apercu';
    font-size: 19px;
    font-weight: 500;
    line-height: 19px;
  }
}

.item-count {
  color: #aaa;
}
</style>
