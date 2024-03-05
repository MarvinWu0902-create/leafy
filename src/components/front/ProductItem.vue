<template>
    <div>
        <div class="flex flex-col items-center justify-center">

            <RouterLink class="relative block w-full group" :to="`/product/${productData.id}`">
                <img class="w-full h-[300px] object-cover mb-4" :src="productData.imageUrl">
                <div
                    class="absolute top-0 left-0 w-full h-[300px] bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-500">
                </div>
                <div
                    class="absolute bg-white  bg-opacity-0 group-hover:bg-opacity-100  translate-y-0 group-hover:-translate-y-6 transition duration-500 left-[0] right-[0] w-2/3 bottom-4 mx-auto text-center px-10 py-3">
                    <p class="text-transparent transition duration-500 group-hover:text-primary">查看內容</p>
                </div>
                <div v-show="productData.origin_price !== productData.price"
                    class="absolute w-1/4 p-1 text-sm text-center text-red-400 top-2 right-2 bg-main">On Sale</div>
            </RouterLink>

            <h3 class="mb-2 text-center">{{ productData.title }}</h3>
            <p class="mb-2 text-center text-secondary" v-if="productData.origin_price === productData.price">
                ${{ productData.price }} NTD
            </p>
            <p class="mb-2 text-center text-secondary" v-else>
                <span class="text-red-400 me-1">${{ productData.price }}</span><del>${{ productData.origin_price }}
                    NTD</del>
            </p>

            <button type="button"
                class="px-2 py-1 transition duration-300 bg-transparent border group text-primary hover:text-white border-primary hover:bg-primary-darker"
                @click="addCart(productData.id)" :disabled="cartLoading.addCart && tempId === productData.id">
                加入購物車
                <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse class="text-primary group-hover:text-white"
                    v-show="cartLoading.addCart && tempId === productData.id" />
            </button>

        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cart.js'

export default {
    props: ['product'],
    data() {
        return {
            productData: [],
        }
    },
    computed: {
        ...mapState(cartStore, ['tempId', 'cartLoading'])
    },
    methods: {
        ...mapActions(cartStore, ['addCart'])
    },
    mounted() {
        this.productData = this.product;
    }
}
</script>
