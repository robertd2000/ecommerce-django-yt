<script setup>
import { onMounted, ref } from 'vue'
import { computed } from '@vue/reactivity'
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import 'bulma'

import { useCartStore } from './stores/cart'
import Spinner from './components/Spinner.vue'

const store = useCartStore()
const { items, loading } = storeToRefs(store)
const showMobileMenu = ref(false)

const cartLength = computed(() => {
  let total = 0

  for (let i = 0; i < items.value.length; i++) {
    total += items.value[i].quantity
  }

  return total
})

onMounted(() => {
  store.initializeStore()
})
</script>

<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <RouterLink to="/" class="navbar-item"
          ><strong>Djackets</strong></RouterLink
        >
        <a
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-menu"
          @click="showMobileMenu = !showMobileMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        class="navbar-menu"
        id="navbar-menu"
        :class="{ 'is-active': showMobileMenu }"
      >
        <div class="navbar-end">
          <RouterLink to="/summer" class="navbar-item">Summer</RouterLink>
          <RouterLink to="/winter" class="navbar-item">Winter</RouterLink>

          <div class="navbar-item">
            <div class="buttons">
              <RouterLink to="/log-in" class="button is-light">
                Log In
              </RouterLink>
              <RouterLink to="/cart" class="button is-success">
                <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                <span>Cart {{ cartLength }}</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <Spinner :is-loading="loading" />

    <section class="section">
      <RouterView />
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2021</p>
    </footer>
  </div>
</template>

<style lang="scss">
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  &.is-loading {
    height: 80px;
  }
}
</style>
