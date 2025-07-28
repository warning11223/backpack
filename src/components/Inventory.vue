<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import IconCross from '@/components/icons/IconCross.vue'
import IconAllSort from '@/components/icons/IconAllSort.vue'
import IconArmorSort from '@/components/icons/IconArmorSort.vue'
import IconMiscSort from '@/components/icons/IconMiscSort.vue'
import IconWeaponSort from '@/components/icons/IconWeaponSort.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconTimer from '@/components/icons/IconTimer.vue'

interface InventoryItem {
  id: string
  type: string
  name: string
  imageUrl: string
  count?: number
  charges?: number
  maxCharges?: number
  cooldown?: number
}

interface ApiResponse {
  inventory: InventoryItem[]
}

const items = ref<InventoryItem[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const activeFilter = ref<'all' | 'armor' | 'weapon' | 'misc'>('all')
const allItems = ref<InventoryItem[]>([])

// Tooltip состояние
const tooltipVisible = ref(false)
const tooltipContent = ref('')
const tooltipX = ref(0)
const tooltipY = ref(0)
const tooltipType = ref<string>('')

// Фильтруем предметы по активному фильтру
const filteredItems = computed(() => {
  if (activeFilter.value === 'all') return allItems.value
  return allItems.value.filter(item => item.type === activeFilter.value)
})

// Обновляем отображаемые предметы при изменении фильтра
const setActiveFilter = (filter: 'all' | 'armor' | 'weapon' | 'misc') => {
  activeFilter.value = filter
  items.value = filteredItems.value
}

// Динамически вычисляем количество рядов на основе количества предметов
const gridRows = computed(() => {
  const minRows = 8
  const itemsCount = items.value.length
  const neededRows = Math.ceil(itemsCount / gridCols)
  return Math.max(minRows, neededRows)
})

const gridCols = 5

// Получаем case из URL параметров
const getCaseFromURL = (): string => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('case') || '1'
}

const URL = "https://us-central1-seven-seven-bit-inhouse-helper.cloudfunctions.net/vueDevTestTask-getInventoryState"

// Загружаем данные с API
const loadInventory = async () => {
  try {
    loading.value = true
    error.value = null

    const caseNumber = getCaseFromURL()
    const response = await fetch(`${URL}?case=${caseNumber}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: ApiResponse = await response.json()
    allItems.value = data.inventory
    items.value = data.inventory
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    console.error('Error loading inventory:', err)
  } finally {
    loading.value = false
  }
}

// Вычисляем количество предметов
const itemCount = computed(() => items.value.length)

// Получаем предмет по позиции в сетке
const getItemAtPosition = (row: number, col: number): InventoryItem | null => {
  const index = row * gridCols + col
  return items.value[index] || null
}

// Форматируем отображение количества
const formatCount = (item: InventoryItem): string => {
  if (item.count && item.count > 1) {
    return `x${item.count}`
  }
  return ''
}

// Проверяем есть ли кулдаун у предмета
const hasCooldown = (item: InventoryItem): boolean => {
  return item.cooldown ? item.cooldown > Date.now() : false
}

// Получаем заголовок для текущего фильтра
const getFilterTitle = (): string => {
  switch (activeFilter.value) {
    case 'all': return 'ALL ITEMS'
    case 'armor': return 'ARMOR'
    case 'weapon': return 'WEAPONS'
    case 'misc': return 'MISCELLANEOUS'
    default: return 'ALL ITEMS'
  }
}

// Добавляем таймер для обновления времени кулдауна
const cooldownTimer = ref<NodeJS.Timeout | null>(null)
const now = ref(Date.now())

// Обновляем текущее время каждую секунду
const startCooldownTimer = () => {
  cooldownTimer.value = setInterval(() => {
    now.value = Date.now()
  }, 1000)
}

// Вычисляем оставшееся время кулдауна в секундах
const getRemainingCooldown = (cooldownTimestamp: number): number => {
  return Math.max(0, Math.floor((cooldownTimestamp - now.value) / 1000))
}

// Форматируем время кулдауна для отображения в формате "100s"
const formatCooldown = (cooldownTimestamp: number): string => {
  const seconds = getRemainingCooldown(cooldownTimestamp)

  return `${seconds}s`
}

// Функции для управления tooltip
const showTooltip = (event: MouseEvent, item: InventoryItem) => {
  tooltipContent.value = item.name
  tooltipType.value = item.type
  tooltipVisible.value = true
  updateTooltipPosition(event)
}

const updateTooltipPosition = (event: MouseEvent) => {
  if (!tooltipVisible.value) return

  const offsetX = 15
  const offsetY = 20

  let x = event.clientX + offsetX
  let y = event.clientY + offsetY

  // Простая проверка границ (можно улучшить)
  if (x + 200 > window.innerWidth) {
    x = event.clientX - 200 - offsetX
  }
  if (y < 0) {
    y = event.clientY + 30
  }

  tooltipX.value = x
  tooltipY.value = y
}

const hideTooltip = () => {
  tooltipVisible.value = false
}

onMounted(() => {
  loadInventory()
  startCooldownTimer()
})

onUnmounted(() => {
  if (cooldownTimer.value) {
    clearInterval(cooldownTimer.value)
  }
})
</script>

<template>
  <!-- Loading state -->
  <div v-if="loading" class="loading-state">
    Loading inventory...
  </div>

  <!-- Error state -->
  <div v-else-if="error" class="error-state">
    Error: {{ error }}
  </div>

  <div v-else class="inventory-container">
    <!-- Header -->
    <div class="inventory-header">
      <div class="tabs">
        <div class="tab active">BACKPACK</div>
        <div class="tab">NEXUS</div>
      </div>
      <div class="close-btn">
        <IconCross />
      </div>
    </div>

    <div class="inventory-content">
      <!-- Sidebar -->
      <div class="sidebar">
        <div class="sidebar-wrapper">
          <div
            class="sidebar-item"
            @click="setActiveFilter('all')"
          >
            <IconAllSort
              :current-color="activeFilter === 'all' ? 'white' : 'gray'"
            />
          </div>
          <div
            @click="setActiveFilter('armor')"
            class="sidebar-item">
            <IconArmorSort
              :current-color="activeFilter === 'armor' ? 'white' : 'gray'"
            />
          </div>
          <div
            @click="setActiveFilter('misc')"
            class="sidebar-item">
            <IconMiscSort
              :current-color="activeFilter === 'misc' ? 'white' : 'gray'"
            />
          </div>
          <div
            @click="setActiveFilter('weapon')"
            class="sidebar-item">
            <IconWeaponSort
              :current-color="activeFilter === 'weapon' ? 'white' : 'gray'"
            />
          </div>
          <div class="sidebar-item"></div>
          <div class="sidebar-item"></div>
        </div>
        <div class="sidebar-item trash-icon">
          <IconDelete />
        </div>
      </div>

      <div>
        <!-- Header with item count -->
        <div class="inventory-header-text">
          <span>{{ getFilterTitle() }}</span>
          <span class="item-count">{{ itemCount }}/{{allItems.length}}</span>
        </div>

        <!-- Main inventory area -->
        <div class="main-inventory">
          <!-- Grid -->
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
                <div
                  v-if="getItemAtPosition(row - 1, col - 1)"
                  class="item-slot"
                  :class="{
                      'armor': getItemAtPosition(row - 1, col - 1)!.type === 'armor',
                      'weapon': getItemAtPosition(row - 1, col - 1)!.type === 'weapon',
                   }"
                  @mouseenter="showTooltip($event, getItemAtPosition(row - 1, col - 1)!)"
                  @mousemove="updateTooltipPosition"
                  @mouseleave="hideTooltip"
                >
                  <img
                    :src="getItemAtPosition(row - 1, col - 1)!.imageUrl"
                    :alt="getItemAtPosition(row - 1, col - 1)!.name"
                    class="item-image"
                  />
                  <div
                    v-if="formatCount(getItemAtPosition(row - 1, col - 1)!)"
                    class="item-quantity"
                  >
                    {{ formatCount(getItemAtPosition(row - 1, col - 1)!) }}
                  </div>

                  <div
                    v-if="getItemAtPosition(row - 1, col - 1)!.charges"
                    class="charges-triangle"
                  ></div>
                  <div
                    v-if="getItemAtPosition(row - 1, col - 1)!.charges"
                    class="charges-triangle-text"
                  >
                    {{ getItemAtPosition(row - 1, col - 1)!.charges }}/{{ getItemAtPosition(row - 1, col - 1)!.maxCharges }}
                  </div>

                  <div
                    v-if="hasCooldown(getItemAtPosition(row - 1, col - 1)!)"
                    class="item-cooldown"
                  >
                    <IconTimer />
                    {{ formatCooldown(getItemAtPosition(row - 1, col - 1)!.cooldown!) }}
                  </div>
                </div>
                <div v-else class="item-slot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 🆕 Глобальный tooltip, следующий за курсором -->
    <div
      v-if="tooltipVisible"
      class="tooltip cursor-tooltip"
      :style="{
        left: tooltipX + 'px',
        top: tooltipY + 'px'
      }"
    >
      {{ tooltipContent }}
    </div>
  </div>
</template>

<style scoped>
.inventory-container {
  max-width: 562px;
  background-color: #2a2a2a;
  border: 1px solid rgb(0, 0, 0);
  font-family: Arial, sans-serif;
  color: white;
  overflow: hidden;
}

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

.inventory-content {
  display: flex;
  height: 500px;
}

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

.grid-icon {
  width: 24px;
  height: 24px;
}

.grid-dots {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  width: 100%;
  height: 100%;
}

.main-inventory {
  flex: 1;
  padding: 0 5px 10px 10px;
  overflow: hidden scroll;
  height: 455px;

  /* Стили скроллбара для Firefox */
  scrollbar-width: thin;
  scrollbar-color: #555 #2a2a2a;

  /* Стили скроллбара для Chrome/Edge/Safari */
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

.item-cooldown {
  font-family: 'Apercu';
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 17px;
  font-weight: bold;

  padding: 2px 6px;
  border-radius: 4px;
  z-index: 22;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
}

.item-slot {
  width: 100%;
  height: 100%;
  background-color: rgb(26, 26, 26);
  border: 1px solid rgb(69, 69, 69);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &.weapon {
    background: radial-gradient(59.01% 59.01% at 50% 50%,rgb(127, 89, 206),rgba(127, 89, 206, 0) 100%),rgb(26, 26, 26);
  }

  &.armor {
    background: radial-gradient(59.01% 59.01% at 50% 50%,rgb(54, 124, 206),rgba(0, 95, 206, 0) 100%),rgb(26, 26, 26);
  }
}

.item-slot.on-cooldown {
  position: relative;
  opacity: 0.5;
  filter: grayscale(50%);
}

.item-image {
  width: 80%;
  height: 80%;
  object-fit: contain;
}

.item-quantity {
  position: absolute;
  bottom: 3px;
  right: 5px;
  color: rgb(255, 255, 255);
  font-family: 'Apercu';
  font-size: 17px;
  font-weight: 500;
  line-height: 17px;
}

.charges-triangle {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 60px solid rgba(6, 6, 6, 0.65);
  border-bottom: 42px solid transparent;
  z-index: 5;
}

.charges-triangle-text {
  position: absolute;
  top: 4px;
  left: 3px;
  z-index: 6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  color: rgb(255, 255, 255);
  font-family: 'Apercu';
  font-size: 17px;
  font-weight: 500;
  line-height: 17px;
  text-align: left;
}

.loading-state, .error-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #aaa;
  font-size: 14px;
}

.error-state {
  color: #ff6b6b;
}

.tooltip.cursor-tooltip {
  position: fixed;
  padding: 4px 8px;
  background-color: rgba(65, 60, 53, 0.8);
  border: 1px solid #555;
  color: white;
  font-size: 12px;
  border-radius: 8px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1000;
  transition: none;
}

.tooltip:not(.cursor-tooltip) {
  display: none;
}
</style>
