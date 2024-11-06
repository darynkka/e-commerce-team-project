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
import { ref, onMounted } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { Product } from '@/API/ProductInterface'

const products = ref<Product[]>([])

onMounted(async () => {
  //просто приклад застосування карточки продукту щоб побачити як вони виглядають
  try {
    const response = await fetch(
      'https://api.escuelajs.co/api/v1/products?limit',
    )
    const data = await response.json()
    products.value = data.slice(0, 5)
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})
</script>
