<template>
  <div class="container my-5">
    <div class="row">
      <!-- Тестова кнопка для функції -->
      <!-- <button class="test" @click="testFuncForFilter">Click me</button>   -->
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
const productStore = useProductStore(); //викликаю Store зі збереженим станом масиву

onMounted(async () => {
  productStore.fetchProducts(35);
 
})
//перевірка роботи функції фільтрування за назвою
function testFuncForFilter() {
  //productStore.filterProductsByName('Shirt')
  //productStore.filterProductByPrice(80, 100)
  // productStore.filterProductsByCategory('Clothes')
}
  
</script>
