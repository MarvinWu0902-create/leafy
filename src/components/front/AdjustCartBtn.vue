<template>
    <div>
        <div class="flex">
            <div class="flex w-full bg-white border border-white rounded-sm">
                <button type="button" class="flex items-center justify-center px-1 border"
                    :class="{ 'cursor-pointer hover:text-red-400': cartData.qty > 1, 'hover:cursor-not-allowed': cartData.qty === 1 }"
                    @click="adjustCartHandler('minus', cartData)" :disabled="cartData.qty === 1">
                    <span class="text-sm font-bold material-symbols-outlined">
                        remove
                    </span>
                </button>

                <input
                    class="w-full h-8 p-2 text-center bg-transparent border focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50"
                    type="text" v-model.number="cartData.qty" @change="adjustCartHandler('input', cartData)">
                <button type="button"
                    class="flex items-center justify-center px-1 border cursor-pointer hover:text-red-400"
                    @click="adjustCartHandler('plus', cartData)">
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
import { mapActions } from 'pinia'
import cartStore from '@/stores/cart.js'
export default {
    props: ['cartData'],
    methods: {
        ...mapActions(cartStore, ['deleteCart', 'adjustCart']),
        adjustCartHandler(type, cart) {

            if (type === 'plus') {
                cart.qty++
            } else if (type === 'minus') {
                cart.qty--
            }
            this.adjustCart(cart);
        }
    },
}
</script>
