<script setup lang="ts">
import IconWeaponSort from '@/components/icons/IconWeaponSort.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconArmorSort from '@/components/icons/IconArmorSort.vue'
import IconMiscSort from '@/components/icons/IconMiscSort.vue'
import IconAllSort from '@/components/icons/IconAllSort.vue'

interface InventoryFiltersProps {
  activeFilter: 'all' | 'armor' | 'weapon' | 'misc'
}

const { activeFilter } = defineProps<InventoryFiltersProps>()

const emit = defineEmits(['update:activeFilter'])

const setActiveFilter = (filter: 'all' | 'armor' | 'weapon' | 'misc') => {
  emit('update:activeFilter', filter)
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-wrapper">
      <div class="sidebar-item" @click="setActiveFilter('all')">
        <IconAllSort :current-color="activeFilter === 'all' ? 'white' : 'gray'" />
      </div>
      <div @click="setActiveFilter('armor')" class="sidebar-item">
        <IconArmorSort :current-color="activeFilter === 'armor' ? 'white' : 'gray'" />
      </div>
      <div @click="setActiveFilter('misc')" class="sidebar-item">
        <IconMiscSort :current-color="activeFilter === 'misc' ? 'white' : 'gray'" />
      </div>
      <div @click="setActiveFilter('weapon')" class="sidebar-item">
        <IconWeaponSort :current-color="activeFilter === 'weapon' ? 'white' : 'gray'" />
      </div>
    </div>
    <div class="sidebar-item trash-icon">
      <IconDelete />
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 50px;
  background-color: rgb(57, 56, 57);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 5px;
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
  padding: 10px;
  border: 2px solid rgb(69, 69, 69);
  border-radius: 2px;
}
</style>
