<template>
    <div>
        <!-- Banner -->
        <div class="bg-home-banner bg-center bg-cover bg-fixed w-full h-[300px] relative">
            <div
                class="flex flex-row items-start justify-between h-full p-4 md:items-end md:flex-col md:justify-center">
                <h3 class="text-base tracking-widest underline text-primary md:mb-10 md:text-white/80 md:text-3xl" data-aos="fade-right">
                    LEAFY一下，心情從此不一樣
                </h3>
                <RouterLink
                    class="flex justify-end md:justify-center items-center tracking-widest text-center w-40 md:w-1/8 text-[16px]  text-gray-400/50 hover:text-white transition duration-300 "
                    to="/productlist" data-aos="fade-right">探索香味
                    <span class="material-symbols-outlined ms-3">
                        start
                    </span>
                </RouterLink>

            </div>
        </div>

        <h2 class="my-10 text-2xl tracking-widest text-center text-dark" data-aos="fade-up">品味自然，享受溫暖</h2>

        <!-- Content -->
        <div class="container mb-10">
            <div class="flex flex-col mb-10 content-1 md:flex-row">
                <div class="img bg-center bg-cover bg-content-1 w-full h-[300px]" data-aos="fade-up"></div>
                <div class="box-border flex flex-col justify-center w-full p-8 text" data-aos="fade-up">
                    <h3 class="mb-10 text-2xl tracking-widest text-center text-dark">堅持自然之選</h3>
                    <p class="mb-4 tracking-widest text-center text-secondary">我們堅守著使用自然賦予的禮物。
                        <span class="block my-2 text-center">確保每一片都來自於最純淨的土地。</span>
                        <span class="block text-center">我們的茶，是您無負擔享受的代名詞。</span>
                    </p>
                    <div class="text-center">
                        <span class="material-symbols-outlined text-secondary" v-for="i of 3" :key="i">
                            nest_eco_leaf
                        </span>
                    </div>
                </div>
            </div>

            <div class="flex flex-col-reverse content-2 md:flex-row ">

                <div class="box-border flex flex-col justify-center w-full p-8 text" data-aos="fade-up">
                    <h3 class="mb-10 text-2xl tracking-widest text-center text-dark">輕享健康</h3>
                    <p class="mb-4 tracking-widest text-center text-secondary">力於尋找更健康的茶飲選擇。
                        <span class="block my-2 text-center">致力於為您帶來既美味又健康的茶飲。</span>
                        <span class="block text-center">美味與健康並行。</span>
                    </p>
                    <div class="text-center">
                        <span class="material-symbols-outlined text-secondary" v-for="i of 3" :key="i">
                            nest_eco_leaf
                        </span>
                    </div>
                </div>

                <div class="img bg-center bg-cover bg-content-2 w-full  h-[300px]" data-aos="fade-up"></div>

            </div>
        </div>

        <h2 class="my-10 text-2xl tracking-widest text-center text-dark" data-aos="fade-up">熱銷商品</h2>
        <!-- product swiper -->
        <ProductSwiper :swiper-data="swiperProduct" data-aos="fade-up"></ProductSwiper>

        <!-- subscribe -->
        <div class="bg-subscribe-banner bg-center bg-cover bg-fixed w-full h-[300px] relative">
            <div class="flex flex-col items-center justify-center h-full">
                <h3 class="mb-6 tracking-widest text-center text-white text-1xl md:text-2xl">訂閱我們</h3>
                <div class="flex flex-col md:flex-row ">
                    <input
                        class="px-8 py-2 mx-0 mb-2 tracking-widest text-center placeholder-white bg-transparent border rounded-sm placeholder:tracking-widest text-white/50 focus:placeholder-gray-200/50 border-primary focus:outline-none focus:border-transparent focus:ring focus:ring-primary/50 md:mb-0 md:mx-2"
                        type="text" placeholder="customer@leafy.io">
                    <a class="w-full px-10 py-2 mx-0 text-center text-white transition duration-300 bg-primary hover:bg-primary-darker md:mx-2"
                        href="#">訂閱</a>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import productStore from '@/stores/product.js'

import ProductSwiper from '@/components/front/ProductSwiper.vue'
export default {
    data() {
        return {
            swiperProduct: [],
        }
    },
    components: {
        ProductSwiper
    },
    computed: {
        ...mapState(productStore, ['productData']),
    },
    methods: {
        ...mapActions(productStore, ['getProduct']),
        swipermouseEnter() {
            this.$refs.swiperRef.swiper.autoplay.stop()
        },
        swipermouseLeave() {
            this.$refs.swiperRef.swiper.autoplay.start()
        }
    },
    watch: {
        productData(newVal) {
            this.swiperProduct = newVal
        }
    },
    mounted() {
        this.getProduct();
    }
}
</script>