<script setup lang="ts">
import { computed, type Ref, toRefs, unref } from 'vue'
import { FilterEnum, type InventoryItemT } from '@/types/inventory-types.ts'

interface InventoryContentProps {
  items: Ref<InventoryItemT[]> | InventoryItemT[]
  activeFilter: FilterEnum
  allItems: InventoryItemT[]
}

const props = defineProps<InventoryContentProps>()
const { activeFilter, allItems, items } = toRefs(props)

// Кол-во предметов
const itemCount = computed(() => unref(items.value).length)

// Заголовок для текущего фильтра
const getFilterTitle = (): string => {
  switch (activeFilter.value) {
    case FilterEnum.All: return 'ALL ITEMS'
    case FilterEnum.Armor: return 'ARMOR'
    case FilterEnum.Weapon: return 'WEAPONS'
    case FilterEnum.Misc: return 'MISCELLANEOUS'
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
    color: var(--text-white);
    font-size: 20px;
    font-weight: 800;
    line-height: 25px;
    text-transform: uppercase;
  }
  span:nth-child(2) {
    color: var(--text-white);
    font-family: 'Apercu';
    font-size: 19px;
    font-weight: 500;
    line-height: 19px;
  }
}

.item-count {
  color: var(--text-white);
}
</style>
