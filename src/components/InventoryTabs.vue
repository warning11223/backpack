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
  background-color: #333;
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
  color: rgba(255, 255, 255, 0.47);
  font-size: 24px;
  font-weight: 800;
  line-height: 30px;
  text-transform: uppercase;
  background-color: rgb(57, 56, 57);
  cursor: pointer;
  border: 1px solid rgb(0, 0, 0);
}

.tab.active {
  background: rgb(36, 34, 35);
  color: rgb(255, 255, 255);
}

.close-btn {
  height: 59px;
  padding: 15px;
  background: rgb(36, 34, 35);
  border: 1px solid rgb(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.5);
}
</style>
