<template>
  <div class="container my-5">
    <!-- filters -->
    <div class="row mb-4 align-items-center">
      <div class="col-md-3 mb-3">
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input
            type="text"
            class="form-control"
            placeholder="Search by name..."
            v-model="searchName"
            @input="handleFilters"
          />
        </div>
      </div>

      <div class="col-md-2 mb-3">
        <select
          class="form-select"
          v-model="selectedCategory"
          @change="handleFilters"
        >
          <option value="">All Categories</option>
          <option
            v-for="category in uniqueCategories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <div class="col-md-5 mb-3">
        <div class="d-flex align-items-center">
          <span class="me-2">Price:</span>
          <input
            type="number"
            class="form-control me-2"
            placeholder="Min"
            v-model="priceFrom"
            @change="handleFilters"
          />
          <span class="me-2">-</span>
          <input
            type="number"
            class="form-control"
            placeholder="Max"
            v-model="priceTo"
            @change="handleFilters"
          />
        </div>
      </div>

      <div class="col-md-2 mb-3 text-end">
        <button class="btn btn-outline-primary w-100" @click="resetFilters">
          <i class="bi bi-x-circle me-1"></i>Reset
        </button>
      </div>
    </div>

    <!-- products grid -->
    <div class="row">
      <div
        class="col-md-4 mb-4"
        v-for="product in paginatedProducts"
        :key="product.id"
      >
        <ProductCard
          :product="product"
          @add-to-cart="handleAddToCart"
          @add-to-favourites="handleAddToFavourites"
        />
      </div>
    </div>

    <!-- pagination-->
    <Pagination v-model:currentPage="currentPage" :totalPages="totalPages" />

    <!-- Cart Popup -->
    <CustomPopup
      :is-visible="isPopupVisible"
      :last-added-item="lastAddedItem"
      @close="closePopup"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import Pagination from '@/components/PaginationComponent.vue'
import CustomPopup from '@/components/CustomPopup.vue'
import { useProductStore } from '../API/Store'
import { useCartStore } from '../API/ShoppingCart'
import { useFavouritesStore } from '../API/Favourites'
import type { Product } from '@/types/ProductInterface'
import { useRouter } from 'vue-router'

const productStore = useProductStore()
const cartStore = useCartStore()
const favouritesStore = useFavouritesStore()

//для url відображення
const router = useRouter()

// Initialize stores from localStorage
onMounted(() => {
  cartStore.loadFromStorage()
  favouritesStore.loadFromStorage()
})

const searchName = ref('')
const selectedCategory = ref('')
const priceFrom = ref('')
const priceTo = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(9)
const originalProducts = ref<Product[]>([])

onMounted(async () => {
  await productStore.fetchProducts(35)
  originalProducts.value = [...productStore.products]

  loadFiltersFromURL()
  watchURLParams()
})

const uniqueCategories = computed(() => {
  const categories = originalProducts.value.map(
    product => product.category.name,
  )
  return [...new Set(categories)]

})

const handleFilters = () => {
  resetToOriginalProducts()
  // Фільтрація за ім'ям
  if (searchName.value) {
    productStore.filterProductsByName(searchName.value)
  }

  // Фільтрація за категорією
  if (selectedCategory.value) {
    productStore.filterProductsByCategory(selectedCategory.value)
  }

  // Фільтрація за ціною
  if (priceFrom.value && priceTo.value) {
    productStore.filterProductByPrice(
      Number(priceFrom.value),
      Number(priceTo.value),
    )
  }

  currentPage.value = 1
  updateQueryParams()
}

// функція для отримання параметрів з URL і встановлення фільтрів
const loadFiltersFromURL = () => {
  const queryParams = router.currentRoute.value.query

  searchName.value = queryParams.name ? queryParams.name as string : ''
  selectedCategory.value = queryParams.category ? queryParams.category as string : ''
  priceFrom.value = queryParams.from ? queryParams.from as string : ''
  priceTo.value = queryParams.to ? queryParams.to as string : ''

  handleFilters()
}

// функція для слідкування за змінами в URL
const watchURLParams = () => {
  watch(() => router.currentRoute.value.query, (newQuery) => {
    searchName.value = newQuery.name ? newQuery.name as string : ''
    selectedCategory.value = newQuery.category ? newQuery.category as string : ''
    priceFrom.value = newQuery.from ? newQuery.from as string : ''
    priceTo.value = newQuery.to ? newQuery.to as string : ''

    handleFilters()
  })
}

const resetToOriginalProducts = () => {
  productStore.products = [...originalProducts.value]
}

const resetFilters = () => {
  searchName.value = ''
  selectedCategory.value = ''
  priceFrom.value = ''
  priceTo.value = ''
  resetToOriginalProducts()
  currentPage.value = 1
  updateQueryParams()
}

const totalPages = computed(() =>
  Math.ceil(productStore.products.length / itemsPerPage.value),
)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return productStore.products.slice(start, end)
})

watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

const isPopupVisible = ref(false)
const lastAddedItem = ref<Product | null>(null)

const handleAddToCart = (product: Product) => {
  cartStore.addItem(product)
  lastAddedItem.value = product
  isPopupVisible.value = true
}

const handleAddToFavourites = (product: Product) => {
  favouritesStore.addItem(product)
}

const closePopup = () => {
  isPopupVisible.value = false
}

// функція для оновлення запитів у URL
const updateQueryParams = () => {
  router.replace({
    path: '/',
    query: {
      name: searchName.value || undefined,
      category: selectedCategory.value || undefined,
      from: priceFrom.value || undefined,
      to: priceTo.value || undefined,
    },
  })
}
</script>

<style scoped>
.input-group-text {
  background-color: #fff;
  border-right: none;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

@media (max-width: 768px) {
  .d-flex {
    flex-wrap: wrap;
  }

  .form-control {
    margin-bottom: 0.5rem;
  }
}
</style>
