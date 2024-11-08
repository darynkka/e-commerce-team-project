import { defineStore } from 'pinia';
import { getAllProducts } from './MainService'
import type { Product } from '@/API/ProductInterface';

//буде зберігати стан продуктів
export const useProductStore = defineStore('productStore', {
    state: () => ({
      products: [] as Product[], // масив продуктів
    }),
    actions: {
        async fetchProducts(limit = 10) {
          try {
            const fetchedProducts = await getAllProducts(0, limit);
            this.products = fetchedProducts.map(product => {
              if (typeof product.images === 'string') {
                  const parsed = JSON.parse(product.images);
                  product.images = Array.isArray(parsed) ? parsed : [parsed];
              }
              product.images = product.images.map(url =>  // очищаю URLs від зайвих символів
                url.replace(/[\[\]"]/g, '').trim()
              );
              return product;
            });
            console.log('store products:', this.products);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        },
      },
    getters: {
      getProducts: (state) => state.products,
    },
  });