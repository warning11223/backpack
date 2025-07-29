export interface InventoryItemT {
  id: string
  type: string
  name: string
  imageUrl: string
  count?: number
  charges?: number
  maxCharges?: number
  cooldown?: number
}
