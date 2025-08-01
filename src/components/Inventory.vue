<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import InventoryTabs from '@/components/InventoryTabs.vue'
import InventoryFilters from '@/components/InventoryFilters.vue'
import LoadingState from '@/components/LoadingState.vue'
import ErrorState from '@/components/ErrorState.vue'
import InventoryContent from '@/components/InventoryContent.vue'
import useInventoryApi from '@/api/use-inventory-api.ts'
import { FilterEnum } from '@/types/inventory-types.ts'

const activeFilter = ref<FilterEnum>(FilterEnum.All)
const { items, loading, error, loadInventory } = useInventoryApi()

const filteredItems = computed(() => {
  if (activeFilter.value === 'all') return items.value
  return items.value.filter((item) => item.type === activeFilter.value)
})

const getCaseFromURL = (): string => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('case') || '1'
}

onMounted(() => {
  loadInventory(getCaseFromURL())
})
</script>

<template>
  <LoadingState :loading="loading" v-if="loading" />
  <ErrorState v-else-if="error" :error="error" />

  <div v-else class="inventory-container">
    <InventoryTabs />

    <div class="inventory-content">
      <InventoryFilters
        :active-filter="activeFilter"
        @update:active-filter="activeFilter = $event"
      />

      <InventoryContent
        :key="activeFilter"
        :items="filteredItems"
        :active-filter="activeFilter"
        :all-items="items"
      />
    </div>
  </div>
</template>

<style scoped>
.inventory-container {
  max-width: 562px;
  background-color: var(--smoky-black);
  border: 1px solid var(--black);
  font-family: Arial, sans-serif;
  color: white;
  overflow: hidden;
}

.inventory-content {
  display: flex;
}
</style>
