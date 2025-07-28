import { createRouter, createWebHistory } from 'vue-router'
import Inventory from '@/components/Inventory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Inventory,
    },
  ],
})

export default router
