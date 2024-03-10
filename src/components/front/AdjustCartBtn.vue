<template>
  <div>
    <div class="flex">
      <div class="flex w-full bg-white border border-white rounded-sm">
        <button type="button" class="flex items-center justify-center px-1 border"
          :class="{ 'cursor-pointer hover:text-red-400': localCartData.qty > 1, 'hover:cursor-not-allowed': localCartData.qty === 1 }"
          @click="adjustCartHandler('minus', localCartData)" :disabled="localCartData.qty === 1">
          <span class="text-sm font-bold material-symbols-outlined">
            remove
          </span>
        </button>

        <input
          class="w-full h-8 p-2 text-center bg-transparent border focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50"
          type="text" v-model.number="localCartData.qty" @change="adjustCartHandler('input', localCartData)">
        <button type="button" class="flex items-center justify-center px-1 border cursor-pointer hover:text-red-400"
          @click="adjustCartHandler('plus', localCartData)">
          <span class="text-sm font-bold material-symbols-outlined">
            add
          </span>
        </button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import cartStore from '@/stores/cart';

export default {
  props: ['cartData'],
  data() {
    return {
      localCartData: this.cartData,
    };
  },
  watch: {
    cartData(newVal) {
      this.localCartData = newVal;
    },
  },
  methods: {
    ...mapActions(cartStore, ['deleteCart', 'adjustCart']),
    adjustCartHandler(type, cart) {
      const updatedCart = { ...cart };

      if (type === 'plus') {
        updatedCart.qty += 1;
      } else if (type === 'minus') {
        updatedCart.qty -= 1;
      }
      this.adjustCart(updatedCart);
    },
  },
};
</script>
