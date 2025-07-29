<script setup lang="ts">
import { FilterEnum, type InventoryItemT } from '@/types/inventory-types.ts'
import { computed, type Ref, unref } from 'vue'
import InventoryGrid from '@/components/InventoryGrid.vue'
import FilterLabel from '@/components/FilterLabel.vue'

interface InventoryContentProps {
  items: Ref<InventoryItemT[]> | InventoryItemT[]
  activeFilter: FilterEnum
  allItems: InventoryItemT[]
}

const { activeFilter, items, allItems } = defineProps<InventoryContentProps>()

const shouldShowScroll = computed(() => {
  const itemsArray = unref(items)
  return itemsArray.length > 40
})
</script>

<template>
  <div class="content-wrapper">
    <FilterLabel
      :items="items"
      :active-filter="activeFilter"
      :all-items="allItems"
    />

    <div
      class="main-inventory"
      :class="{ 'with-scroll': shouldShowScroll }"
    >
      <InventoryGrid :items="items" />
    </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  border: 1px solid var(--dark);
}

.main-inventory {
  flex: 1;
  padding: 0 7px 0px 14px;
  margin-bottom: 16px;
  overflow: hidden;
  max-height: 744px;
  margin-right: 7.7px;

  &.with-scroll {
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 6px;
    margin-right: 6px;

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-track {
      background: var(--white-gray);

    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--scroll-white);
    }
  }
}
</style>
