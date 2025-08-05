<script setup lang="ts">
import ItemCooldown from '@/components/ItemCooldown.vue'
import { FilterEnum, type InventoryItemT } from '@/types/inventory-types.ts'
import CursorTooltip from '@/components/CursorTooltip.vue'
import { computed, unref, type Ref, ref } from 'vue'

interface InventoryItemProps {
  row: number
  col: number
  items: Ref<InventoryItemT[]> | InventoryItemT[]
  gridCols: number
}

const props = defineProps<InventoryItemProps>()

const tooltipVisible = ref(false)
const tooltipContent = ref('')
const tooltipX = ref(0)
const tooltipY = ref(0)
const tooltipType = ref<string>('')

const itemsArray = computed(() => unref(props.items))

// Получаем предмет по позиции в сетке
const currentItem = computed((): InventoryItemT | null => {
  const index = (props.row - 1) * props.gridCols + (props.col - 1)
  return itemsArray.value?.[index] ?? null
})

const hasItem = computed(() => currentItem.value !== null)

const itemClasses = computed(() => {
  if (!currentItem.value) return {}

  return {
    'armor': currentItem.value.type === FilterEnum.Armor,
    'weapon': currentItem.value.type === FilterEnum.Weapon,
  }
})

const itemCount = computed(() => {
  if (!currentItem.value?.count || currentItem.value.count <= 1) return ''
  return `x${currentItem.value.count}`
})

const hasCharges = computed(() =>
  currentItem.value?.charges !== undefined && currentItem.value?.charges !== null
)

const chargesText = computed(() => {
  if (!hasCharges.value || !currentItem.value) return ''
  return `${currentItem.value.charges}/${currentItem.value.maxCharges}`
})

// Получение предмета
const getItemAtPosition = (row: number, col: number): InventoryItemT | null => {
  const index = row * props.gridCols + col
  return itemsArray.value?.[index] ?? null
}

const showTooltip = (event: MouseEvent) => {
  if (!currentItem.value) return

  tooltipContent.value = currentItem.value.name
  tooltipType.value = currentItem.value.type
  tooltipVisible.value = true
  updateTooltipPosition(event)
}

const updateTooltipPosition = (event: MouseEvent) => {
  if (!tooltipVisible.value) return

  const offsetX = 15
  const offsetY = 20

  let x = event.clientX + offsetX
  let y = event.clientY + offsetY

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
</script>

<template>
  <div
    v-if="hasItem"
    class="item-slot"
    :class="itemClasses"
    @mouseenter="showTooltip"
    @mousemove="updateTooltipPosition"
    @mouseleave="hideTooltip"
  >
    <img
      :src="currentItem!.imageUrl"
      :alt="currentItem!.name"
      class="item-image"
    />

    <div
      v-if="itemCount"
      class="item-quantity"
    >
      {{ itemCount }}
    </div>

    <div
      v-if="hasCharges"
      class="charges-triangle"
    ></div>

    <div
      v-if="hasCharges"
      class="charges-triangle-text"
    >
      {{ chargesText }}
    </div>

    <ItemCooldown
      :row="props.row"
      :col="props.col"
      :get-item-at-position="getItemAtPosition"
    />
  </div>

  <CursorTooltip
    :tooltip-visible="tooltipVisible"
    :tooltip-x="tooltipX"
    :tooltip-y="tooltipY"
    :tooltip-content="tooltipContent"
  />
</template>

<style scoped>
.item-image {
  width: 80%;
  height: 80%;
  object-fit: contain;
}

.item-quantity {
  position: absolute;
  bottom: 3px;
  right: 5px;
  color: var(--text-white);
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
  border-left: 60px solid var(--darkened);
  border-bottom: 42px solid transparent;
  z-index: 5;
}

.charges-triangle-text {
  position: absolute;
  top: 4px;
  left: 3px;
  z-index: 6;
  text-shadow: 1px 1px 2px var(--black-80);
  color: var(--text-white);
  font-family: 'Apercu';
  font-size: 17px;
  font-weight: 500;
  line-height: 17px;
  text-align: left;
}

.item-slot {
  width: 100%;
  height: 100%;
  background-color: var(--dark);
  border: 1px solid var(--white-gray);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &.weapon {
    background: radial-gradient(59.01% 59.01% at 50% 50%,rgb(127, 89, 206),rgba(127, 89, 206, 0) 100%),var(--dark);
  }

  &.armor {
    background: radial-gradient(59.01% 59.01% at 50% 50%,rgb(54, 124, 206),rgba(0, 95, 206, 0) 100%),var(--dark);
  }
}
</style>
