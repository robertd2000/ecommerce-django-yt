import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import axios from 'axios'

import { useCartStore } from '../stores/cart'

export const useProducts = () => {
  const store = useCartStore()
  const { items, loading } = storeToRefs(store)
  const showMobileMenu = ref(false)

  const cartLength = computed(() => {
    let total = 0

    for (let i = 0; i < items.value.length; i++) {
      total += items.value[i].quantity
    }

    return total
  })

  onMounted(() => {
    store.initializeStore()
    getLatestProducts()
  })

  const latestProducts = ref([])

  const getLatestProducts = async () => {
    store.setLoading(true)
    try {
      const response = await axios.get('/api/v1/latest-products/')
      latestProducts.value = response.data
    } catch (e) {
      console.log(e)
    } finally {
      store.setLoading(false)
    }
  }

  return {
    items,
    latestProducts,

    loading,
    showMobileMenu,
    cartLength,
  }
}
