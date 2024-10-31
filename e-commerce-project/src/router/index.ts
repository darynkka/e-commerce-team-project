import { createRouter, createWebHistory } from 'vue-router'
import FavouritesItems from '@/components/FavouritesItems.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
import MainComponent from '@/components/MainComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainComponent,
    },
    {
      path: '/shopping-cart',
      name: 'shopping-cart',
      component: ShoppingCart,
    },
    {
      path: '/favourites-items',
      name: 'favourites-items',
      component: FavouritesItems,
    },
  ],
})

export default router
