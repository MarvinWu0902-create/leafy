import { defineStore } from 'pinia'
import { apipostOrder, apigetAllOrder, apigetSingleOrder, apipayOrder } from '@/api/order.js';

import router from '@/router/index.js';
export default defineStore('order', {
    state() {
        return {
            orderStatus: '',
            orderData: {},
            orderAllData: [],
            orderToast: {},
            orderLoading: {
                get: false,
                post: false,
                pay: false,
            },

        }
    },
    actions: {
        orderChange(status) {
            this.orderStatus = status
        },
        postOrder(user, message) {
            this.orderLoading.post = true;
            apipostOrder(user, message)
                .then((res) => {
                    router.push(`/ordercreate/${res.data.orderId}`);
                    this.orderToast = res.data;
                })
                .catch(() => {
                    alert('建立訂單失敗')
                })
        },
        getAllOrder() {
            this.orderLoading.get = true
            apigetAllOrder()
                .then((res) => {
                    this.orderLoading.get = false
                    const { pagination, orders } = res.data
                    this.orderAllData = orders
                })
                .catch(() => {
                    alert('取得所有訂單失敗')
                })
        },
        getSingleOrder(id) {
            apigetSingleOrder(id)
                .then((res) => {
                    this.orderData = res.data.order;
                    this.orderLoading.post = false;
                    if (this.orderData.is_paid) {
                        this.orderStatus = 'finish';
                    } else {
                        this.orderStatus = 'create';
                    }
                })
                .catch(() => {
                    alert('取得單一訂單失敗')
                })
        },
        payOrder(id) {
            this.orderLoading.pay = true;
            apipayOrder(id)
                .then((res) => {
                    this.orderToast = res.data;
                    return apigetSingleOrder(id)
                })
                .then((res) => {
                    this.orderData = res.data.order;
                    this.orderLoading.pay = false;
                    this.orderStatus = 'finish';
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                })
                .catch(() => {
                    alert('付款失敗')
                })
        }
    }
})