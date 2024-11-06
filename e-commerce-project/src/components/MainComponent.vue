<!-- src/components/MainComponent -->
<!-- <template>
  <div>
    <app-navigation></app-navigation>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import AppNavigation from './AppNavigation.vue'
</script> -->

<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { Product } from '@/API/ProductCardInterface'

//просто приклад застосування карточки продукту
const products = ref<Product[]>([
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  },
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  },
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  },
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  },
])
</script>
