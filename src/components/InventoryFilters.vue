<script setup lang="ts">
import IconWeaponSort from '@/components/icons/IconWeaponSort.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconArmorSort from '@/components/icons/IconArmorSort.vue'
import IconMiscSort from '@/components/icons/IconMiscSort.vue'
import IconAllSort from '@/components/icons/IconAllSort.vue'
import { FilterEnum } from '@/types/inventory-types.ts'

interface InventoryFiltersProps {
  activeFilter: FilterEnum
}

const { activeFilter } = defineProps<InventoryFiltersProps>()

const emit = defineEmits(['update:activeFilter'])

const setActiveFilter = (filter: FilterEnum) => {
  emit('update:activeFilter', filter)
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-wrapper">
      <div class="sidebar-item" @click="setActiveFilter(FilterEnum.All)">
        <IconAllSort :current-color="activeFilter === FilterEnum.All ? 'white' : 'gray'" />
      </div>
      <div @click="setActiveFilter(FilterEnum.Armor)" class="sidebar-item">
        <IconArmorSort :current-color="activeFilter === FilterEnum.Armor ? 'white' : 'gray'" />
      </div>
      <div @click="setActiveFilter(FilterEnum.Misc)" class="sidebar-item">
        <IconMiscSort :current-color="activeFilter === FilterEnum.Misc ? 'white' : 'gray'" />
      </div>
      <div @click="setActiveFilter(FilterEnum.Weapon)" class="sidebar-item">
        <IconWeaponSort :current-color="activeFilter === FilterEnum.Weapon ? 'white' : 'gray'" />
      </div>
    </div>
    <div class="sidebar-item trash-icon">
      <IconDelete />
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 64px;
  background-color: var(--gray);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 11px;
  border: 1px solid var(--black);
}

.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar-item {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.sidebar-item.trash-icon {
  padding: 7px;
  border: 2px solid var(--white-gray);
  border-radius: 2px;
}
</style>
