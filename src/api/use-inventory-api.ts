import { ref } from 'vue'
import type { InventoryItemT } from '@/types/inventory-types.ts'

interface ApiResponse {
  inventory: InventoryItemT[]
}

export default function useInventoryApi() {
  const items = ref<InventoryItemT[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const loadInventory = async (caseId: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await fetch(`${import.meta.env.VITE_CLIENT_URL}?case=${caseId}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse = await response.json()
      items.value = data.inventory
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
      console.error('Error loading inventory:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    loading,
    error,
    loadInventory
  }
}
