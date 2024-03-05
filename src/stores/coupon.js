import { defineStore } from 'pinia'
import { apipostCoupon } from '@/api/coupon.js'
import cartStore from '@/stores/cart.js'

export default defineStore('coupon', {
    state() {
        return {
            couponCode: 'iloveleafy',
            couponLoading: {
                postCoupon: false,
            },
            resInfo: '',
        }
    },
    getters: {
        iscouponApply() {
            const { cartData } = cartStore();
            if (cartData[0]?.coupon === undefined) {
                return false
            } else {
                return true
            }
        }
    },
    actions: {
        postCoupon(code) {
            this.couponLoading.postCoupon = true;
            apipostCoupon(code)
                .then((res) => {
                    this.resInfo = res.data;
                    const { getCart } = cartStore();
                    getCart();
                })
                .then(() => {
                    this.couponLoading.postCoupon = false;
                })
                .catch(() => {
                    this.resInfo = '套用優惠券失敗';
                })
        }
    }
})
