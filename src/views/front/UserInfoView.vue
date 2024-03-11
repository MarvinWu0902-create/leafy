<template>
    <div>
        <VueLoading :active="orderLoading.get" :can-cancel="true" :is-full-page="true" />
        <div class="container">
            <OrderModal></OrderModal>
            <div class="p-4 my-10 border">
                <div class="px-4 py-2" v-for="(order, key) of orderAllData" :key="key">

                    <div
                        class="flex justify-between p-4 text-sm text-center border md:text-start md:text-base">

                        <p class="hidden font-medium text-red-500 md:block">
                            <span class="material-symbols-outlined">
                                order_approve
                            </span>
                            訂單編號 : {{ order.id }}
                        </p>
                        <p class="block font-medium text-red-500 md:hidden">
                            {{ order.id }}
                        </p>

                        <button
                            class="flex items-center px-2 text-gray-400/80 md:text-sm md:text-white md:border md:rounded me-0 md:me-1 md:bg-red-400/80 md:hover:bg-red-400"
                            type="button" @click="getSingleOrder(order.id)">
                            <p class="hidden tracking-wide md:block">消費明細</p>
                            <span class="text-sm material-symbols-outlined">
                                open_in_new
                            </span>
                        </button>
                    </div>

                    <div class="flex flex-col p-4 text-sm border md:flex-row md:text-base">
                        <p class="flex-1 text-gray-500">訂單日期 :
                            {{ formatTimestamp(order.create_at * 1000) }}
                        </p>
                        <p class="flex-1 text-gray-500">總消費金額 : {{ order.total }}</p>
                    </div>

                    <div class="flex flex-col p-4 text-sm border md:flex-row md:text-base">
                        <p class="flex-1 hidden text-gray-500 md:block">運送狀態 :
                            {{ order.is_paid ? '黑貓宅配-常溫(台灣含離島)' : '-' }} </p>
                        <p class="flex-1 text-gray-500" v-if="order.is_paid">訂單狀態 : 訂單處理中</p>
                        <div class="flex items-center justify-between flex-1" v-else>
                            <p class="text-gray-500 me-3">訂單狀態 : 訂單建立中</p>
                            <RouterLink :to="`/ordercreate/${order.id}`"
                                class="flex items-center justify-center px-2 py-1 text-gray-400 hover:text-primary">
                                <span class="text-base material-symbols-outlined ">
                                    arrow_outward
                                </span>
                                付款
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import orderStore from '@/stores/order';

import formatTime from '@/mixins/time';

import OrderModal from '@/components/front/user/OrderModal.vue';

export default {
  components: {
    OrderModal,
  },
  mixins: [formatTime],
  computed: {
    ...mapState(orderStore, ['orderAllData', 'orderLoading']),
  },
  methods: {
    ...mapActions(orderStore, ['getAllOrder', 'getSingleOrder']),
  },
  mounted() {
    this.getAllOrder();
  },

};
</script>

<style lang="scss" scoped></style>
