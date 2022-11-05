<template>
  <div
    class="is-loading-bar has-text-centered"
    v-bind:class="{ 'is-loading': isLoading }"
  >
    <div class="lds-dual-ring"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  isLoading: Boolean,
})
</script>
