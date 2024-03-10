<template>
    <div>
        <ProgressBar class="mt-10 mb-16"></ProgressBar>
        <div class="container flex flex-col items-baseline mb-10 md:flex-row" v-show="!orderLoading.get">
            <ul class="w-full mb-10 md:mb-0 me-0 md:me-4">
                <div class="flex mb-4">
                    <h3 class="text-2xl me-4">訂單內容</h3>
                    <p class="leading-8"
                        :class="{ ' text-red-400': !orderData?.is_paid, 'text-green-600': orderData?.is_paid }">{{
            `${orderData?.is_paid ? '( 付款完成 )' : '( 未付款 )'}` }}</p>

                </div>
                <li class="flex pb-4 "
                    :class="{ 'border-b-2': index === Object.keys(orderData?.products).slice(-1)[0] }"
                    v-for="(product, index) of orderData?.products" :key="product.id">
                    <div class="flex w-full">
                        <div class="w-24">
                            <img class="object-cover w-full h-20" :src="product.product.imageUrl" alt="#">
                        </div>

                        <div class="flex justify-between w-full p-4">
                            <div class="product-info">
                                <p>{{ product.product.title }}</p>
                                <p>數量 : {{ product.qty }}</p>
                            </div>
                            <div class="price">
                                <p>NT${{ product.final_total }}</p>
                            </div>

                        </div>
                    </div>
                </li>
                <p class="my-4 text-end">總計金額 : <span class="text-2xl">NT${{ orderData?.total }}</span></p>
            </ul>

            <div class="w-full bg-main ms-0 md:ms-4">
                <div class="p-8">
                    <h3 class="mb-4 text-2xl">訂購資訊</h3>
                    <p class="mb-4 text-xl"
                        :class="{ 'text-green-600': orderData?.is_paid, 'text-red-400': !orderData?.is_paid }">
                        訂單金額 : <span class="font-bold">NT${{ orderData?.total }}</span></p>
                    <p class="mb-4">訂單編號 : <span class="font-light">{{ orderData?.id }}</span></p>
                    <p class="mb-4">訂購時間 : <span class="font-light">{{ new Date(orderData?.create_at *
            1000).toLocaleString()
                            }}</span></p>
                    <p class="mb-4">Email : <span class="font-light">{{ orderData?.user?.email }}</span></p>
                    <p class="mb-4">收件人姓名 : <span class="font-light">{{ orderData?.user?.name }}</span></p>
                    <p class="mb-4">連絡電話 : <span class="font-light">{{ orderData?.user?.tel }}</span></p>
                    <p class="mb-4">收件地址 : <span class="font-light">{{ orderData?.user?.address }}</span></p>
                    <p class="mb-10">備註 : <span class="font-light">{{ orderData?.message }}</span></p>
                    <button type="button"
                        class="block w-full py-2 text-center text-white transition duration-300 bg-primary hover:bg-primary-darker"
                        :class="{ 'cursor-wait': orderLoading.pay }" @click="payOrder(orderData?.id)"
                        v-if="!orderData?.is_paid">
                        前往付款
                        <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse class="text-white"
                            v-show="orderLoading.pay" />
                    </button>
                    <RouterLink
                        class="flex items-center justify-center w-full py-2 tracking-widest text-center text-white transition duration-300 bg-primary hover:bg-primary-darker"
                        to="/productlist" v-else>繼續選購
                        <span class="material-symbols-outlined ms-1">
                            shopping_cart_checkout
                        </span>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';

import cartStore from '@/stores/cart';
import orderStore from '@/stores/order';

import ProgressBar from '@/components/front/order/ProgressBar.vue';

export default {
  components: {
    ProgressBar,
  },
  computed: {
    ...mapState(orderStore, ['orderData', 'orderLoading']),
  },
  methods: {
    ...mapActions(orderStore, ['orderChange', 'getSingleOrder', 'payOrder']),
    ...mapActions(cartStore, ['getCart']),
  },
  mounted() {
    this.orderChange('');
    this.getCart();
    this.getSingleOrder(this.$route.params.id);
  },

};
</script>
