import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import axios from 'axios'
import { toast } from 'bulma-toast'

import { useCartStore } from '../stores/cart'

export const useCategory = () => {
  const store = useCartStore()
  const products = ref([])
  const name = ref('')

  const route = useRoute()

  onMounted(() => getCategory())

  watch(route, () => getCategory())

  const getCategory = async () => {
    store.setLoading(true)

    const { category_slug } = route.params

    try {
      const response = await axios.get(`/api/v1/products/${category_slug}/`)
      products.value = response.data.products
      name.value = response.data.name
    } catch (e) {
      console.log(e)
      toast({
        message: 'Something went wrong. Please try again.',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: 'bottom-right',
      })
    } finally {
      store.setLoading(false)
    }
  }

  return {
    name,
    products,
  }
}
