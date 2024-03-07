<template>
    <div>
        <VueLoading :active="productLoading.getProduct" :can-cancel="true" :is-full-page="true" />
        <div class="container" v-show="!productLoading.getProduct">
            <h3 class="my-10 text-2xl font-bold tracking-widest text-center text-primary">LEAFY商品列表</h3>
            <GroupBtn class="mb-10"></GroupBtn>
            <div class="grid grid-cols-1 gap-4 px-10 mb-10 md:grid-cols-3 md:px-0">
                <ProductItem class="pb-4 mb-4 border " v-for="product of filterProductData" :key="product.id"
                    :product="product" data-aos="fade-up"></ProductItem>
            </div>
            <PaginationBtn class="mb-10"></PaginationBtn>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import ProductItem from '@/components/front/ProductItem.vue'
import GroupBtn from '@/components/front/productlist/GroupBtn.vue'
import PaginationBtn from '@/components/front/productlist/PaginationBtn.vue'

import productStore from '@/stores/product.js'

export default {
    components: {
        ProductItem,
        GroupBtn,
        PaginationBtn,
    },
    computed: {
        ...mapState(productStore, ['productData', 'filterProductData', 'productLoading']),
    },
    methods: {
        ...mapActions(productStore, ['getProduct']),
    },
    mounted() {
        this.getProduct();
    }
}
</script>