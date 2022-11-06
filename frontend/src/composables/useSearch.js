import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useCartStore } from '../stores/cart'

export const useSearch = () => {
  const store = useCartStore()

  const query = ref('')
  const products = ref([])

  onMounted(() => {
    document.title = 'Search | Djackets'

    let uri = window.location.search.substring(1)
    let params = new URLSearchParams(uri)

    if (params.get('query')) {
      query.value = params.get('query')

      getSearch()
    }
  })

  const getSearch = async () => {
    store.setLoading(true)

    try {
      const response = await axios.post('/api/v1/products/search/', {
        query: query.value,
      })
      products.value = response.data
    } catch (e) {
      console.log(e)
    } finally {
      store.setLoading(false)
    }
  }

  return {
    query,
    products,
  }
}
