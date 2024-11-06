<!-- src/components/FavouritesItems.vue -->
<template>
  <div class="container py-4">
    <h2 class="mb-4">Favourites</h2>

    <div v-if="favorites.length === 0" class="text-center py-5">
      <i class="bi bi-heart-break display-1 text-muted"></i>
      <h3 class="mt-3">Your favourites list is empty</h3>
      <router-link to="/" class="btn btn-primary mt-3">
        Browse Products
      </router-link>
    </div>

    <div v-else class="row g-4">
      <div class="col-md-3" v-for="item in favorites" :key="item.id">
        <div class="card h-100">
          <div class="position-relative">
            <img :src="item.image" class="card-img-top p-3" :alt="item.title" />
            <button
              class="btn btn-danger btn-remove"
              @click="removeFromFavorites(item.id)"
            >
              <i class="bi bi-heart-fill"></i>
            </button>
          </div>

          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-truncate">{{ item.title }}</h5>
            <p class="card-text text-muted small mb-2">{{ item.category }}</p>
            <p class="card-text description-text">{{ item.description }}</p>
            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center">
                <span class="price">${{ item.price }}</span>
                <button class="btn btn-primary" @click="addToCart(item)">
                  <i class="bi bi-cart-plus"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Sample favorites data
const favorites = ref([])

const removeFromFavorites = (id: number) => {
  favorites.value = favorites.value.filter(item => item.id !== id)
}

const addToCart = (item: any) => {
  // Add to cart logic here
}
</script>

<style scoped>
.btn-remove {
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.description-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.9rem;
}

.price {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0d6efd;
}
</style>
