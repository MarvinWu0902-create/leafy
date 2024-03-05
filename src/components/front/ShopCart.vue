<template>
    <div>
        <Transition name="fade" enter-active-class="transition duration-300" leave-active-class="transition duration-300"
            enter-from-class="opacity-0 translate-x-[100px]" enter-to-class="translate-x-0 opacity-100"
            leave-from-class="translate-x-0 opacity-100" leave-to-class="opacity-0 translate-x-[100px]">

            <div class="fixed overflow-y-auto top-0 right-0 w-full md:w-1/2 lg:w-[400px] h-screen bg-dark z-20"
                v-if="iscartOpen">

                <div class="flex justify-between p-4 border border-t-0 border-b-2 border-x-0 border-primary">
                    <p class="tracking-widest text-secondary text-4">購物車</p>
                    <button type="button" class="cursor-pointer text-4" @click="cartClick">
                        <span class="material-symbols-outlined text-secondary hover:text-white">close</span>
                    </button>
                </div>

                <div class="flex items-center justify-between p-4 cart-item"
                    :class="{ 'border-x-0 border-t-0 border-b-2 border-primary': index === cartData.length - 1 }"
                    v-for="(cart, index) of cartData" :key="cart.id" v-if="cartData.length > 0">
                    <!-- 商品照片、細項 -->
                    <div class="flex">
                        <img class="object-cover h-24 w-28" :src="cart.product.imageUrl" alt="商品照片">
                        <div class="flex flex-col justify-center p-2 item-info">
                            <h3 class="text-white text-5">{{ cart.product.title }}</h3>
                            <p class="text-white text-5">${{ cart.final_total }} NTD</p>
                        </div>
                    </div>


                    <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse class="text-white"
                        v-show="(cartLoading.adjustCart || cartLoading.delCart) && tempId === cart.id" />
                    <AdjustCartBtn class="w-1/3" :cart-data="cart">
                        <button type="button"
                            class="flex items-center justify-center px-1 cursor-pointer text-gray-200/20 hover:text-gray-400 ms-1"
                            @click="deleteCart('single', cart.id)">
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                    </AdjustCartBtn>
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
                        class="block p-4 mx-4 mb-4 text-center transition duration-300 bg-white cursor-pointer hover:bg-primary text-primary hover:text-white">
                        確認結帳</RouterLink>

                    <button type="button"
                        class="block w-24 py-2 mx-auto mb-4 text-sm text-center text-gray-400 transition duration-300 bg-transparent border border-gray-400 hover:bg-gray-400 hover:text-dark"
                        @click="deleteCart('all')" :disabled="cartLoading.delCart && tempId === ''">
                        清空購物車
                        <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse class="text-white"
                            v-show="cartLoading.delCart && tempId === ''" /></button>
                </div>

                <div v-else>
                    <RouterLink to="/productlist"
                        class="block w-1/3 p-2 mx-auto mb-4 text-center transition duration-300 rounded cursor-pointer bg-white/90 hover:bg-primary text-primary hover:text-white"
                        @click="cartClick">前往挑選商品</RouterLink>
                </div>


            </div>


        </Transition>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cart.js'

import AdjustCartBtn from '@/components/front/AdjustCartBtn.vue'

export default {
    components: {
        AdjustCartBtn
    },
    computed: {
        ...mapState(cartStore, ['cartData', 'tempId', 'finaltotalPrice', 'totalPrice', 'iscartOpen', 'cartLoading'])
    },
    methods: {
        ...mapActions(cartStore, ['deleteCart', 'adjustCart', 'cartClick']),
        adjustCartHandler(type, cart) {

            if (type === 'plus') {
                cart.qty++
            } else if (type === 'minus') {
                cart.qty--
            }
            this.adjustCart(cart);
        }
    },
    watch: {
        iscartOpen(newval) {
            newval
                ? document.body.classList.add('overflow-hidden')
                : document.body.classList.remove('overflow-hidden')
        }
    }
}
</script>
