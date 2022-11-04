<script setup>
import { RouterLink, RouterView } from 'vue-router'
import 'bulma'
import { ref } from 'vue'

const showMobileMenu = ref(false)
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
                <span>Cart</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="section">
      <RouterView />
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2021</p>
    </footer>
  </div>
</template>

<style scoped></style>
