<script setup>
import ProductBox from '../components/ProductBox.vue'
import { useCategory } from '../composables/useCategory'

const { name, products } = useCategory()
</script>

<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">{{ name }}</h2>
      </div>

      <ProductBox
        v-for="product in products"
        v-bind:key="product.id"
        v-bind:product="product"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
