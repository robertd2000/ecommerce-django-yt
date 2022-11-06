<script setup>
import { useCart } from '../composables/useCart'

const props = defineProps(['item'])

const { removeFromCart, incrementQuantity, decrementQuantity } = useCart()
</script>

<template>
  <tr>
    <td>
      <router-link :to="item?.product?.get_absolute_url">{{
        item?.product?.name
      }}</router-link>
    </td>
    <td>${{ item?.product?.price }}</td>
    <td>
      {{ item?.quantity }}
      <a @click="decrementQuantity(item)">-</a>
      <a @click="incrementQuantity(item)">+</a>
    </td>
    <td>${{ getItemTotal }}</td>
    <td>
      <button
        class="delete"
        @click="removeFromCart(item?.product?.id)"
      ></button>
    </td>
  </tr>
</template>

<style lang="scss" scoped></style>
