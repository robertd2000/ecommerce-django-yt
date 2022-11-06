import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { toast } from 'bulma-toast'

import { useCartStore } from '../stores/cart'

export const useProduct = () => {
  const store = useCartStore()

  onMounted(() => {
    getProduct()
  })

  const product = ref(null)
  const quantity = ref(1)

  const getProduct = async () => {
    const { category_slug, product_slug } = useRoute().params
    store.setLoading(true)
    try {
      const response = await axios.get(
        `api/v1/products/${category_slug}/${product_slug}`
      )
      product.value = response.data
    } catch (e) {
      console.log(e)
    } finally {
      store.setLoading(false)
    }
  }

  const addToCart = () => {
    if (isNaN(quantity.value) || quantity.value < 1) {
      quantity.value = 1
    }

    const item = {
      product: product.value,
      quantity: quantity.value,
    }

    store.addToCart(item)

    toast({
      message: 'The product was added to the cart',
      type: 'is-success',
      dismissible: true,
      pauseOnHover: true,
      duration: 2000,
      position: 'bottom-right',
    })
  }

  return {
    product,
    quantity,
    addToCart,
  }
}
