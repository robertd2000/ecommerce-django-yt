<script setup>
import { useProduct } from '../composables/useProduct'

const { product, quantity, addToCart } = useProduct()
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
