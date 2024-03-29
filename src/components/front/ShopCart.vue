<template>
    <div>
        <Transition name="fade" enter-active-class="transition duration-300"
            leave-active-class="transition duration-300" enter-from-class="opacity-0 translate-x-[100px]"
            enter-to-class="translate-x-0 opacity-100" leave-from-class="translate-x-0 opacity-100"
            leave-to-class="opacity-0 translate-x-[100px]">

            <div class="fixed overflow-y-auto top-0 right-0 w-full md:w-1/2 lg:w-[400px] h-screen bg-dark z-30"
                v-if="iscartOpen">

                <div class="flex justify-between p-4 border border-t-0 border-b-2 border-x-0 border-primary">
                    <p class="tracking-widest text-secondary text-4">購物車</p>
                    <button type="button" class="cursor-pointer text-4" @click="cartClick">
                        <span class="material-symbols-outlined text-secondary hover:text-white">close</span>
                    </button>
                </div>

                <div v-if="cartData.length > 0">
                    <div class="flex items-center justify-between p-4 cart-item"
                        :class="{ 'border-x-0 border-t-0 border-b-2 border-primary': index === cartData.length - 1 }"
                        v-for="(cart, index) of cartData" :key="cart.id">
                        <!-- 商品照片、細項 -->
                        <div class="flex justify-between w-full md:w-auto md:justify-start">
                            <div class="flex-shrink-0 h-24 w-28">
                                <img class="object-cover w-full h-full" :src="cart.product.imageUrl" alt="商品照片">
                            </div>
                            <div class="flex flex-col justify-between mx-2 md:justify-center item-info">
                                <h3 class="text-center text-white md:text-base text-5">{{ cart.product.title }}</h3>
                                <p class="text-center text-white md:text-base text-5">${{ cart.final_total }} NTD</p>
                                <AdjustCartBtn class="block md:hidden" :cart-data="cart"></AdjustCartBtn>
                            </div>
                            <button type="button"
                                class="flex items-center justify-center px-1 cursor-pointer md:hidden text-gray-200/20 hover:text-gray-400 ms-1"
                                @click="deleteCart('single', cart.id)">
                                <span class="material-symbols-outlined">
                                    delete
                                </span>
                            </button>
                        </div>

                        <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse class="text-white"
                            v-show="(cartLoading.adjustCart || cartLoading.delCart) && tempId === cart.id" />
                        <AdjustCartBtn class="hidden w-1/3 md:block" :cart-data="cart">
                            <button type="button"
                                class="flex items-center justify-center px-1 cursor-pointer text-gray-200/20 hover:text-gray-400 ms-1"
                                @click="deleteCart('single', cart.id)">
                                <span class="material-symbols-outlined">
                                    delete
                                </span>
                            </button>
                        </AdjustCartBtn>
                    </div>
                </div>

                <div class="flex flex-col items-center justify-center" v-else>
                    <span class="mt-10 mb-1 text-4xl text-gray-400 material-symbols-outlined">
                        feedback
                    </span>
                    <p class="mb-10 text-gray-400">購物車內沒有商品</p>
                </div>

                <!-- 總計 -->
                <div v-if="cartData.length > 0">
                    <div class="p-4 text-white sum-count text-end text-5">
                        <p>總計金額：$ {{ finaltotalPrice }} NTD</p>
                    </div>
                    <RouterLink to="/ordercheck" @click="cartClick"
                        class="block p-2 mx-4 mb-4 text-center transition duration-300 bg-white cursor-pointer md:p-4 hover:bg-primary text-primary hover:text-white">
                        確認結帳</RouterLink>

                    <button type="button"
                        class="block w-24 py-2 mx-auto mb-6 text-sm text-center text-gray-400 transition duration-300 bg-transparent border border-gray-400 md:mb-4 hover:bg-gray-400 hover:text-dark"
                        @click="deleteCart('all')" :disabled="cartLoading.delCart && tempId === ''">
                        清空購物車
                        <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse class="text-white"
                            v-show="cartLoading.delCart && tempId === ''" /></button>
                </div>

                <div v-else>
                    <RouterLink to="/productlist"
                        class="block w-1/2 p-2 mx-auto mb-4 text-center transition duration-300 rounded cursor-pointer md:w-1/3 bg-white/90 hover:bg-primary text-primary hover:text-white"
                        @click="cartClick">前往挑選商品</RouterLink>
                </div>

            </div>

        </Transition>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import cartStore from '@/stores/cart';

import AdjustCartBtn from '@/components/front/AdjustCartBtn.vue';

export default {
  components: {
    AdjustCartBtn,
  },
  computed: {
    ...mapState(cartStore, ['cartData', 'tempId', 'finaltotalPrice', 'totalPrice', 'iscartOpen', 'cartLoading']),
  },
  methods: {
    ...mapActions(cartStore, ['deleteCart', 'adjustCart', 'cartClick']),
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
  watch: {
    iscartOpen(newval) {
      document.body.classList.toggle('overflow-hidden', newval);
    },
  },
};
</script>
