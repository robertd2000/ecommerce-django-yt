import { defineStore } from 'pinia'
import { ref } from 'vue'
import { save } from '../utils/helpers'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const loading = ref(false)

  const initializeStore = () => {
    if (localStorage.getItem('cart')) {
      items.value = JSON.parse(localStorage.getItem('cart'))
    } else {
      save(items.value)
    }
  }

  const addToCart = (item) => {
    const exists = items.value.find((i) => i.product.id === item.product.id)
    if (exists) {
      exists.quantity = parseInt(exists.quantity) + parseInt(item.quantity)
    } else {
      items.value.push(item)
    }

    save(items.value)
  }

  const setLoading = (status) => (loading.value = status)

  return {
    loading,
    items,
    addToCart,
    initializeStore,
    setLoading,
  }
})
