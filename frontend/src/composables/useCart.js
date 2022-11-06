import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { save } from '../utils/helpers'

export const useCart = () => {
  const store = useCartStore()
  const { items } = storeToRefs(store)

  const cartTotalLength = computed(() =>
    items.value?.reduce((acc, value) => (acc += value?.quantity), 0)
  )
  const cartTotalPrice = computed(() =>
    items.value?.reduce(
      (acc, value) => (acc += value?.quantity * value?.product?.price),
      0
    )
  )

  const removeFromCart = (itemId) => {
    items.value = items?.value?.filter((item) => item.product.id !== itemId)
    save(items.value)
  }

  const incrementQuantity = (item) => {
    item.quantity += 1
    save(items.value)
  }

  const decrementQuantity = (item) => {
    item.quantity -= 1

    if (item.quantity === 0) {
      removeFromCart(item?.product?.id)
    }
    save(items.value)
  }

  return {
    items,
    cartTotalLength,
    cartTotalPrice,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  }
}
