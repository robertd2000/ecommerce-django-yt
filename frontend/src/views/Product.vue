<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import axios from 'axios'
import { toast } from 'bulma-toast'

import { useCartStore } from '../stores/cart'

const store = useCartStore()

const product = ref(null)
const quantity = ref(1)

onMounted(() => {
  getProduct()
})

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
</script>

<template>
  <div class="page-product">
    <div class="columns is-multiline">
      <div class="column is-9">
        <figure class="image mb-6">
          <img v-bind:src="product?.get_image" />
        </figure>

        <h1 class="title">{{ product?.name }}</h1>

        <p>{{ product?.description }}</p>
      </div>

      <div class="column is-3">
        <h2 class="subtitle">Information</h2>

        <p><strong>Price: </strong>${{ product?.price }}</p>

        <div class="field has-addons mt-6">
          <div class="control">
            <input type="number" class="input" min="1" v-model="quantity" />
          </div>

          <div class="control">
            <a class="button is-dark" @click="addToCart()">Add to cart</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.image img {
  width: 400px;
}
</style>
