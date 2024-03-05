<template>
    <div>
        <div class="container mb-10">
            <swiper-container :slides-per-view="slideView" :autoplay="autoplayConfig" :loop="loopMode"
                :breakpoints="breakpointsConfig" ref="swiperRef" @mouseenter="swipermouseEnter"
                @mouseleave="swipermouseLeave">

                <swiper-slide v-for="product of swiperData" :key="product.id" class="pb-4 border">

                    <ProductItem :product="product"></ProductItem>

                </swiper-slide>

            </swiper-container>
        </div>
    </div>
</template>

<script>
import ProductItem from '@/components/front/ProductItem.vue'

export default {
    props: ['swiperData'],
    components: {
        ProductItem
    },
    data() {
        return {
            swiperRef: null,
            slideView: 1,
            autoplayConfig: {
                delay: 2500,
                disableOnInteraction: true
            },
            breakpointsConfig: {
                768: { slidesPerView: 3, spaceBetween: 24 }
            },
            loopMode: true
        }
    },
    methods: {
        swipermouseEnter() {
            this.$refs.swiperRef.swiper.autoplay.stop()
        },
        swipermouseLeave() {
            this.$refs.swiperRef.swiper.autoplay.start()
        }
    },
    watch: {
        swiperData() {
            this.$refs.swiperRef.swiper.update()
        }
    }
}
</script>
