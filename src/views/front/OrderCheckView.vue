<template>
    <div>
        <ToastCard :toast-msg="resInfo" :show-time="2000"></ToastCard>
        <ProgressBar class="mt-10 mb-16"></ProgressBar>

        <div class="container mb-10" v-show="!cartLoading.getCart">
            <h3 class="p-4 bg-gray-400/10">購物車</h3>

            <div class="hidden p-4 border md:block">
                <table class="w-full mb-4 border">
                    <thead>
                        <tr class="font-normal">
                            <th class="p-4 font-normal text-start">商品資料</th>
                            <th class="py-4 font-normal ">單件價格</th>
                            <th class="py-4 font-normal ">數量</th>
                            <th class="py-4 font-normal ">小計</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border" v-for="cart of cartData" :key="cart.id">
                            <td class="flex p-4">
                                <div class="w-32 me-4">
                                    <img class="object-cover w-full h-20" :src="cart.product.imageUrl" alt="#">
                                </div>
                                <div class="flex flex-col items-baseline justify-center w-full">
                                    <p class="px-1 leading-6 text-white rounded bg-primary-darker">
                                        {{ cart.product.category }}
                                    </p>
                                    <p class="font-normal">{{ cart.product.title }}</p>
                                </div>
                            </td>
                            <td class="w-24 text-sm text-center">
                                NT$
                                {{ cart.product.price }}
                                <del class="text-sm text-gray-400"
                                    v-show="cart.product.price !== cart.product.origin_price">
                                    {{ cart.product.origin_price }}
                                </del>
                            </td>
                            <td>
                                <AdjustCartBtn class="w-2/3 mx-auto" :cart-data="cart"></AdjustCartBtn>
                            </td>
                            <td class="w-20 text-sm text-end pe-4">NT${{ cart.total }}</td>
                            <td class="p-4">
                                <a class="flex items-center justify-center cursor-pointer text-gray-500/50 hover:text-gray-500"
                                    @click="deleteCart('single', cart.id)">
                                    <span class="text-sm font-black material-symbols-outlined">
                                        close
                                    </span>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="isDiscount">
                    <div class="p-4 border">優惠</div>
                    <div class="p-4 border">
                        <p class="mb-4 text-sm">已享用之優惠</p>
                        <DiscountBar class="mb-2" :color="'bg-green-400/50'" v-show="isoverFreightLimit">
                            <template #name>免運優惠</template>
                            <template #content>滿${{freightLimit}}免運</template>
                        </DiscountBar>
                        <DiscountBar :color="'bg-red-400/50'" v-show="ispromotionalSales">
                            <template #name>活動優惠</template>
                            <template #content>季活動促銷(折扣金額依商品不同而有差異)</template>
                        </DiscountBar>
                    </div>
                </div>
                <div v-else>
                    <div class="p-4 border">優惠</div>
                    <div class="p-4 border">
                        <p class="mb-4 text-sm">未享有優惠</p>
                    </div>
                </div>
            </div>

            <div class="block p-4 border md:hidden">
                <div class="border" v-for="cart of cartData" :key="cart.id">
                    <div class="flex justify-between p-4">
                        <!-- 品項(照片、名稱) -->
                        <div class="flex">
                            <div class="w-24 me-4">
                                <img class="object-cover w-full h-20" :src="cart.product.imageUrl" alt="#">
                            </div>
                            <div class="flex flex-col items-baseline justify-center">
                                <p class="px-1 text-sm leading-6 text-white rounded bg-primary-darker">
                                    {{ cart.product.category }}
                                </p>
                                <p class="text-sm font-normal ">{{ cart.product.title }}</p>
                            </div>
                        </div>
                        <!-- 清除品項、品項小計 -->
                        <div class="flex flex-col justify-between">
                            <a class="flex items-center justify-end cursor-pointer text-gray-500/50 hover:text-gray-500"
                                @click="deleteCart('single', cart.id)">
                                <span class="text-sm font-black material-symbols-outlined">
                                    close
                                </span>
                            </a>
                            <p>
                                NT$
                                {{ cart.product.price }}
                                <del class="text-sm text-gray-400"
                                    v-show="cart.product.price !== cart.product.origin_price">
                                    {{ cart.product.origin_price }}
                                </del>
                            </p>
                        </div>

                    </div>
                    <div class="flex justify-between p-4">

                        <AdjustCartBtn class="w-1/2" :cart-data="cart"></AdjustCartBtn>

                        <p class="text-end ">NT${{ cart.total }}</p>
                    </div>
                </div>

                <div v-if="isDiscount">

                    <div class="p-4 border">優惠</div>

                    <div class="p-4 border">
                        <p class="mb-4 text-sm">已享用之優惠</p>
                        <DiscountBar class="mb-2" :color="'bg-green-400/50'" v-show="isoverFreightLimit">
                            <template #name>免運優惠</template>
                            <template #content>滿${{freightLimit}}免運</template>
                        </DiscountBar>
                        <DiscountBar :color="'bg-red-400/50'" v-show="ispromotionalSales">
                            <template #name>活動優惠</template>
                            <template #content>季活動促銷(折扣金額依商品不同而有差異)</template>
                        </DiscountBar>
                    </div>


                </div>
                <div v-else>
                    <div class="p-4 border">優惠</div>
                    <div class="p-4 border">
                        <p class="mb-4 text-sm">未享有優惠</p>
                    </div>
                </div>
            </div>
        </div>


        <div class="container flex flex-col items-baseline mb-10 md:flex-row">

            <div class="w-full mx-0 mb-10 border md:me-4 md:mb-0">
                <h3 class="p-4 bg-gray-400/10">訂單資訊</h3>

                <div class="flex flex-col justify-between p-4">
                    <div>
                        <div class="flex justify-between mb-4">
                            <p>小計</p>
                            <p>NT${{ finaltotalPrice }}</p>
                        </div>
                        <div class="flex justify-between mb-4">
                            <p>運費</p>
                            <p v-if="isoverFreightLimit">免運</p>
                            <p v-else>NT${{ freightPrice }}</p>
                        </div>
                        <p>優惠代碼</p>
                        <div class="flex justify-between mb-4">

                            <input
                                class="w-full p-2 text-center text-gray-400 border focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/30"
                                :class="{ 'cursor-not-allowed': iscouponApply }" type="text" :value="couponCode"
                                :disabled="iscouponApply">
                            <button type="button" class="w-full text-white "
                                :class="{ 'bg-gray-400 cursor-not-allowed': iscouponApply, 'bg-primary hover:bg-primary-darker': !iscouponApply }"
                                @click="postCoupon(couponCode)" :disabled="iscouponApply">
                                {{ iscouponApply ? '已套用' : '套用優惠券' }}
                                <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse class="text-white"
                                    v-show="couponLoading.postCoupon" />
                            </button>
                        </div>
                    </div>
                    <div class="flex justify-between py-4 mb-2 font-bold border-t border-b">
                        <p>合計</p>
                        <p>NT${{ sumPrice }}</p>
                    </div>
                </div>
            </div>

            <ContactForm class="w-full mx-0 border form-info md:ms-4"></ContactForm>

        </div>


    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import ProgressBar from '@/components/front/order/ProgressBar.vue'
import DiscountBar from '@/components/front/order/DiscountBar.vue'
import ContactForm from '@/components/front/order/ContactForm.vue'
import AdjustCartBtn from '@/components/front/AdjustCartBtn.vue'
import ToastCard from '@/components/ToastCard.vue'

import cartStore from '@/stores/cart.js'
import orderStore from '@/stores/order.js'
import couponStore from '@/stores/coupon.js'

export default {
    components: {
        ProgressBar,
        DiscountBar,
        ContactForm,
        AdjustCartBtn,
        ToastCard,
    },
    data() {
        return {
            freightPrice: 20,
            freightLimit: 100
        }
    },
    computed: {
        ...mapState(cartStore, ['cartData', 'tempId', 'iscartOpen', 'cartLoading', 'finaltotalPrice', 'totalPrice']),
        ...mapState(orderStore, ['orderStatus','orderLoading']),
        ...mapState(couponStore, ['couponCode', 'couponLoading', 'resInfo', 'iscouponApply']),
        isDiscount() {
            return this.cartData.filter((i) => !(i.product.origin_price === i.product.price)).length
                || this.cartData.map((i) => i.total).reduce((a, b) => a + b, 0) >= this.freightLimit
        },
        isoverFreightLimit() {
            return this.cartData.map((i) => i.total).reduce((a, b) => a + b, 0) >= this.freightLimit
        },
        ispromotionalSales() {
            return this.cartData.filter((i) => !(i.product.origin_price === i.product.price)).length
        },
        sumPrice() {
            let price = 0;
            this.iscouponApply ? price += this.finaltotalPrice : price += this.totalPrice;
            this.isoverFreightLimit ? price += 0 : price += this.freightPrice
            return price
        }
    },
    methods: {
        ...mapActions(cartStore, ['getCart', 'deleteCart', 'cartClick']),
        ...mapActions(orderStore, ['orderChange']),
        ...mapActions(couponStore, ['postCoupon']),
    },
    watch: {
        cartData(newVal) {
            if (!newVal.length) {
                this.iscartOpen
                    ? this.cartClick()
                    : true;
                this.$router.push('/productlist')
            } else {
                this.orderChange('check')
            }
        },
        iscouponApply() {
            this.getCart()
        }

    },
    mounted() {
        this.getCart()
    }
}
</script>