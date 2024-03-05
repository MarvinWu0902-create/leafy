<template>
    <VueLoading :active="productLoading.getSingle || productLoading.getProduct" :can-cancel="true" :is-full-page="true" />
    <div v-show="!productLoading.getSingle && !productLoading.getProduct">
        <div class="container flex flex-col my-10 md:flex-row">
            <div class="w-full mx-0 mb-4 img-area md:me-4 md:mb-0">
                <div class="flex flex-col">
                    <img class="w-full object-cover h-[300px] md:h-[400px]" :src="tempMainImage" alt="#">
                    <div class="flex justify-between w-full mt-2">
                        <div class="relative w-full cursor-pointer group"
                            :class="{ 'mx-4': index !== 0 && index !== singleData.imagesUrl.length - 1 }"
                            @mouseenter="handleMouseEnter(image)" @mouseleave="handleMouseLeave"
                            v-for="(image, index) of singleData.imagesUrl" :key="image">
                            <img class="w-full object-cover h-[100px]" :src="image" alt="#">
                            <div
                                class="absolute top-0 left-0 w-full h-[100px] bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full mx-0 info-area md:ms-4">
                <BreadCrumb class="mb-4"></BreadCrumb>
                <div class="flex items-center mb-4">
                    <h3 class="text-2xl tracking-widest">{{ singleData.title }}</h3>
                    <p class="px-1 leading-6 text-white rounded bg-primary-darker ms-2">{{ singleData.category }}</p>
                </div>

                <p class="mb-4 leading-8 tracking-wider text-secondary">{{ singleData.description }}</p>
                <p class="mb-4 text-secondary">每份重量 : {{ singleData.content }}g</p>
                <p class="mb-10 text-4xl text-primary"
                    :class="{ 'text-red-400': singleData.price !== singleData.origin_price }">
                    NT${{ singleData.price }}
                    <del class="text-sm text-primary" v-show="singleData.price !== singleData.origin_price">
                        {{ singleData.origin_price }}
                    </del>
                    <span class="text-sm text-primary">/{{ singleData.unit }}</span>
                </p>

                <div class="flex w-full">
                    <input type="number"
                        class="w-1/2 px-4 py-2 border border-primary focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50 me-2"
                        v-model="productCount">
                    <button type="button"
                        class="w-1/3 py-4 text-white transition duration-300 group bg-primary hover:bg-primary-darker ms-2"
                        @click="addCart(singleData.id, productCount)" :disabled="cartLoading.addCart">
                        加入購物車
                        <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse class="text-white"
                            v-show="cartLoading.addCart" />
                    </button>
                </div>
            </div>
        </div>

        <!-- 相關商品button -->
        <div class="container flex justify-between">
            <RouterLink
                class="flex items-center justify-center px-6 py-2 bg-transparent border group text-primary-darker hover:text-white hover:bg-primary border-primary"
                :to="`/product/${arrow.id}`" v-for="(arrow, index) of arrowData" :key="arrow.id"
                v-show="arrowData.length >= 2">
                <span class="material-symbols-outlined text-primary-darker group-hover:text-white me-2"
                    v-show="index === 0">
                    arrow_left_alt
                </span>
                {{ arrow.title }}
                <span class="material-symbols-outlined text-primary-darker group-hover:text-white ms-2"
                    v-show="index === 1">
                    arrow_right_alt
                </span>
            </RouterLink>
        </div>


        <!-- 注意事項-->
        <div class="my-20 bg-main">
            <div class="container flex flex-col md:flex-row">
                <div class="flex flex-col justify-center w-full px-10 my-20 note text-secondary">
                    <h3 class="mb-4 text-2xl tracking-widest">注意事項</h3>
                    <p class="mb-4 tracking-wider">LEAFY 嚴選天然茶葉，致力於為您提供一場純粹的茶香之旅。</p>
                    <p class="mb-4 tracking-wider">為了讓每一葉茶葉都能在您的杯中綻放其最佳風味</p>
                    <p class="mb-4 tracking-wider">請您按照以下指南妥善保存茶葉：</p>
                    <p class="tracking-wider">開封後請確保茶葉包裝袋緊密封存，避免茶葉受潮或變質。若選擇冷藏或冷凍，請使用密封罐或食品級保鮮袋，以維持茶葉的新鮮度和獨特香氣。</p>
                </div>
                <div class="hidden w-full img md:block">
                    <div class="w-full h-full bg-center bg-cover bg-note"></div>
                </div>
            </div>
        </div>

        <!-- 相關產品Swiper -->
        <h3 class="my-10 text-2xl text-center md:my-20" v-show="relatedData.length > 0">相關商品</h3>
        <ProductSwiper :swiper-data="relatedData"></ProductSwiper>

    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import productStore from '@/stores/product.js'
import cartStore from '@/stores/cart.js'


import ProductSwiper from '@/components/front/ProductSwiper.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'

export default {
    components: {
        ProductSwiper,
        BreadCrumb
    },
    data() {
        return {
            productCount: 1,
            tempMainImage: '',
        }
    },
    computed: {
        ...mapState(productStore, ['productData', 'singleData', 'productLoading']),
        ...mapState(cartStore, ['cartLoading']),
        relatedData() {
            return this.productData.filter((i) => i.category === this.singleData.category && i.title !== this.singleData.title)
        },
        arrowData() {

            const filterData = this.productData.filter((i) => i.category === this.singleData.category);
            const index = filterData.findIndex((i) => i.id === this.singleData.id);

            if (index === -1) {
                return []
            }
            if (index === 0) {
                return [filterData.slice(-1)[0], filterData[1]]
            } else if (index === filterData.length - 1) {
                return [filterData[index - 1], filterData[0]]
            } else {
                return [filterData[index - 1], filterData[index + 1]]
            }

        }
    },
    methods: {
        ...mapActions(productStore, ['getProduct', 'getsingleProduct']),
        ...mapActions(cartStore, ['addCart']),
        handleMouseEnter(imageInfo) {
            this.tempMainImage = imageInfo;
        },
        handleMouseLeave() {
            this.tempMainImage = this.singleData.imageUrl;
        },
    },
    watch: {
        singleData(newVal) {
            this.tempMainImage = newVal.imageUrl
        },
        $route(to) {
            this.getsingleProduct(to.params.id);
        }
    },
    mounted() {
        this.getsingleProduct(this.$route.params.id)
    }
}
</script>

<style lang="scss" scoped></style>