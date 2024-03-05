import { defineStore } from 'pinia'
import { apigetCart, apipostCart, apideleteCart, apideleteCarts,apiadjustCart } from '@/api/cart.js'

export default defineStore('cart', {
    state() {
        return {
            cartData: [],
            tempId: '',
            cartLoading: {
                getCart: false,
                addCart: false,
                delCart: false,
                adjustCart:false,
            },
            iscartOpen: false,
            resInfo: '',
            finaltotalPrice: 0,
            totalPrice: 0,
        }
    },
    actions: {
        getCart() {
            this.cartLoading.getCart = true;
            apigetCart()
                .then((res) => {
                    const { carts, final_total, total } = res.data.data;
                    this.cartData = carts;
                    this.finaltotalPrice = final_total;
                    this.totalPrice = total;
                    this.cartLoading.getCart = false;
                })
                .catch(() => {
                    alert('取得購物車資料失敗')
                })
        },
        addCart(product_id, qty) {
            this.tempId = product_id;
            this.cartLoading.addCart = true;
            apipostCart(product_id, qty)
                .then((res) => {
                    this.resInfo = res.data;
                    return apigetCart()
                })
                .then((res) => {
                    const { carts, final_total, total } = res.data.data;
                    this.cartData = carts;
                    this.finaltotalPrice = final_total;
                    this.totalPrice = total;
                    this.cartLoading.addCart = false;
                    this.tempId = '';
                })
                .catch(() => {
                    alert('品項加入購物車失敗')
                })
        },
        deleteCart(type, cartId) {
            this.cartLoading.delCart = true;
            if (type === 'all') {
                apideleteCarts()
                    .then((res) => {
                        this.resInfo = res.data;
                        return apigetCart()
                    })
                    .then((res) => {
                        const { carts, final_total, total } = res.data.data;
                        this.cartData = carts;
                        this.finaltotalPrice = final_total;
                        this.totalPrice = total;
                        this.cartLoading.delCart = false;
                    })
                    .catch(() => {
                        alert('刪除購物車全品項失敗')
                    })
            } else {
                this.tempId = cartId;
                apideleteCart(cartId)
                    .then((res) => {
                        this.resInfo = res.data;
                        return apigetCart()
                    })
                    .then((res) => {
                        const { carts, final_total, total } = res.data.data;
                        this.cartData = carts;
                        this.finaltotalPrice = final_total;
                        this.totalPrice = total;
                        this.cartLoading.delCart = false;
                        this.tempId = '';
                    })
                    .catch(() => {
                        alert('刪除購物車品項失敗')
                    })
            }

        },
        adjustCart(data) {
            const { id, product_id, qty } = data;
            this.cartLoading.adjustCart = true;
            this.tempId = id;
            apiadjustCart(id, product_id, qty)
                .then((res) => {
                    this.resInfo = res.data;
                    return apigetCart()
                })
                .then((res)=>{
                    const { carts, final_total, total } = res.data.data;
                        this.cartData = carts;
                        this.finaltotalPrice = final_total;
                        this.totalPrice = total;
                        this.cartLoading.adjustCart = false;
                        this.tempId=''
                })
                .catch(() => {
                    alert('調整購物車品項數量失敗')
                })
        },
        cartClick() {
            this.iscartOpen = !this.iscartOpen
        },

    }
})