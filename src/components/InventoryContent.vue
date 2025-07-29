<script setup lang="ts">
import type { InventoryItemT } from '@/types/inventory-types.ts'
import { type Ref } from 'vue'
import InventoryGrid from '@/components/InventoryGrid.vue'
import FilterLabel from '@/components/FilterLabel.vue'

interface InventoryContentProps {
  items: Ref<InventoryItemT[]> | InventoryItemT[]
  activeFilter: 'all' | 'armor' | 'weapon' | 'misc'
  allItems: InventoryItemT[]
}

defineProps<InventoryContentProps>()
</script>

<template>
  <div>
    <FilterLabel
      :items="items"
      :active-filter="activeFilter"
      :all-items="allItems"
    />

    <div class="main-inventory">
      <InventoryGrid :items="items" />
    </div>
  </div>
</template>

<style scoped>
.main-inventory {
  flex: 1;
  padding: 0 5px 10px 10px;
  overflow: hidden scroll;
  height: 455px;

  scrollbar-width: thin;
  scrollbar-color: #555 #2a2a2a;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #2a2a2a;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 4px;
    border: 1px solid #444;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #666;
  }
}
</style>
