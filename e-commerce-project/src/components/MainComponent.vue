<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-4 mb-4" v-for="product in productStore.products" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import {useProductStore} from '../API/Store'
const productStore = useProductStore();

onMounted(async () => {
  productStore.fetchProducts(15);
})
</script>
