<script setup>
import axios from 'axios'
import { toast } from 'bulma-toast'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductBox from '../components/ProductBox.vue'
import { useCartStore } from '../stores/cart'

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
