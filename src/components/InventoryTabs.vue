<script setup lang="ts">
import IconCross from '@/components/icons/IconCross.vue'
</script>

<template>
  <header class="inventory-header">
    <div class="tabs">
      <div class="tab active">BACKPACK</div>
      <div class="tab">NEXUS</div>
    </div>
    <div class="close-btn">
      <IconCross />
    </div>
  </header>
</template>

<style scoped>
.inventory-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tabs {
  display: flex;
  width: 100%;
}

.tab {
  height: 59px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: var(--text-gray-47);
  font-size: 24px;
  font-weight: 800;
  line-height: 30px;
  text-transform: uppercase;
  background-color: var(--gray);
  cursor: pointer;
  border: 1px solid var(--black);
}

.tab.active {
  background: var(--smoky-black);
  color: var(--text-white);
}

.close-btn {
  height: 59px;
  padding: 15px;
  background: var(--smoky-black);
  border: 1px solid var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  color: var(--gray-50);
}
</style>
