import { defineStore } from 'pinia';
import {
  apipostOrder, apigetAllOrder, apigetSingleOrder, apipayOrder,
} from '@/api/order';

import router from '@/router/index';

export default defineStore('order', {
  state() {
    return {
      orderStatus: '',
      orderData: {},
      orderAllData: [],
      orderLoading: {
        get: false,
        post: false,
        pay: false,
      },

    };
  },
  actions: {
    orderChange(status) {
      this.orderStatus = status;
    },
    postOrder(user, message) {
      this.orderLoading.post = true;
      apipostOrder(user, message)
        .then((res) => {
          this.orderLoading.post = false;
          router.push(`/ordercreate/${res.data.orderId}`);
        })
        .catch(() => {
          alert('建立訂單失敗');
        });
    },
    getAllOrder() {
      this.orderLoading.get = true;
      apigetAllOrder()
        .then((res) => {
          this.orderLoading.get = false;
          const { orders } = res.data;
          this.orderAllData = orders;
        })
        .catch(() => {
          alert('取得所有訂單失敗');
        });
    },
    getSingleOrder(id) {
      this.orderLoading.get = true;
      apigetSingleOrder(id)
        .then((res) => {
          this.orderData = res.data.order;
          this.orderLoading.get = false;
          if (this.orderData.is_paid) {
            this.orderStatus = 'finish';
          } else {
            this.orderStatus = 'create';
          }
        })
        .catch(() => {
          alert('取得單一訂單失敗');
        });
    },
    payOrder(id) {
      this.orderLoading.pay = true;
      apipayOrder(id)
        .then(() => apigetSingleOrder(id))
        .then((res) => {
          this.orderData = res.data.order;
          this.orderLoading.pay = false;
          this.orderStatus = 'finish';
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        })
        .catch(() => {
          alert('付款失敗');
        });
    },
  },
});
