// call functions that belongs to product list &   API functions
// export this file in components ProductCard.vue, MainComponent.vue


//ПОВЕРТАЮ ПОКИ ЩО КОЖНУ ФУНКЦІЮ, ДАЛІ УЗГДОДИМ ЯК ЦЕ РОЗУМНО ЗРОБИТИ
import type { Product } from './ProductInterface'
import axios from 'axios'

const BASE_URL = 'https://api.escuelajs.co/api/v1/products';

export const getAllProducts = async (offset = 0, limit = 20): Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>(`${BASE_URL}?offset=${offset}&limit=${limit}`);
        
        // перевірка чи є дані у відповіді
        if (!response.data) {
            throw new Error('No data received from the server');
        }
        return response.data;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // Сервер відповів з помилкою 
                console.error(`Server error: ${error.response.status}`);
            } else if(error.request) {
                // Запит був зроблений, але відповіді не отримано
                console.error('No response received from server');
            }else {
                // Помилка при налаштуванні запиту
                console.error('Error setting up request');
            }
        } else {
            console.error('Error fetching products:', error);
        }
        
        // пустий масив у випадку помилки
        return [];
    }
};

