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
            @input="handleNameFilter"
          />
        </div>
      </div>

      <div class="col-md-2 mb-3">
        <select
          class="form-select"
          v-model="selectedCategory"
          @change="handleCategoryFilter"
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
          />
          <span class="me-2">-</span>
          <input
            type="number"
            class="form-control"
            placeholder="Max"
            v-model="priceTo"
            @change="handlePriceFilter"
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
        <ProductCard :product="product" @add-to-cart="handleAddToCart" />
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

const productStore = useProductStore()
const searchName = ref('')
const selectedCategory = ref('')
const priceFrom = ref('')
const priceTo = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(9) //буде по 9 товарів на одну сторінку

const originalProducts = ref([]) //зберігає початковий список продуктів для скидання фільтрів без перезавантаження

onMounted(async () => {
  await productStore.fetchProducts(35)
  originalProducts.value = [...productStore.products]
})

const uniqueCategories = computed(() => {
  //тут витягую унікальні категорії з продуктів для випадаючого фільтра категорії
  const categories = originalProducts.value.map(
    product => product.category.name,
  )
  return [...new Set(categories)]
})

//фільтація за ім'ям
const handleNameFilter = () => {
  resetToOriginalProducts()
  if (searchName.value) {
    productStore.filterProductsByName(searchName.value)
  }
  currentPage.value = 1 //gісля кожної фільтрації скидаю пагінацію на першу сторінку
}

//фільтація за категорією
const handleCategoryFilter = () => {
  resetToOriginalProducts()
  if (selectedCategory.value) {
    productStore.filterProductsByCategory(selectedCategory.value)
  }
  currentPage.value = 1
}

//фільтація за ціною
const handlePriceFilter = () => {
  resetToOriginalProducts()
  if (priceFrom.value && priceTo.value) {
    productStore.filterProductByPrice(
      Number(priceFrom.value),
      Number(priceTo.value),
    )
  }
  currentPage.value = 1
}

const resetToOriginalProducts = () => {
  //це щоб перед кожною фільтрацією відновити оригінальний список продуктів, щоб уникнути накладання фільтрів
  productStore.products = [...originalProducts.value]
}

const resetFilters = () => {
  searchName.value = ''
  selectedCategory.value = ''
  priceFrom.value = ''
  priceTo.value = ''
  resetToOriginalProducts()
  currentPage.value = 1
}

const totalPages = computed(() =>
  Math.ceil(productStore.products.length / itemsPerPage.value),
)

const paginatedProducts = computed(() => {
  //контролює відображення продуктів для поточної сторінки
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return productStore.products.slice(start, end)
})

//слідкує за змінами сторінок
watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

const isPopupVisible = ref(false)
const lastAddedItem = ref<Product | null>(null)

const handleAddToCart = (product: Product) => {
  lastAddedItem.value = product
  isPopupVisible.value = true
}

const closePopup = () => {
  isPopupVisible.value = false
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

/* Адаптивність */
@media (max-width: 768px) {
  .d-flex {
    flex-wrap: wrap;
  }

  .form-control {
    margin-bottom: 0.5rem;
  }
}
</style>
