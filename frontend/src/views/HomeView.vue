<script setup>
import ProductBox from '../components/ProductBox.vue'
import Spinner from '../components/Spinner.vue'
import { useProducts } from '../composables/useProducts'

const { latestProducts } = useProducts()
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
