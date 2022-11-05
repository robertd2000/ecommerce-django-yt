<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'

import ProductBox from '../components/ProductBox.vue'
import Spinner from '../components/Spinner.vue'

const store = useCartStore()
const { loading } = storeToRefs(store)
const latestProducts = ref([])

onMounted(() => {
  getLatestProducts()
})

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
</script>

<template>
  <main class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">Welcome to Djacket</p>
        <p class="subtitle">The best jacket store online</p>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest products</h2>
      </div>

      <ProductBox
        v-for="product in latestProducts"
        :key="product.id"
        :product="product"
      />

      <Spinner :is-loading="loading" />
    </div>
  </main>
</template>
