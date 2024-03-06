<template>
    <div>
        <VueLoading :active="orderLoading.get" :can-cancel="true" :is-full-page="true" />
        <div class="container">

            <!-- <div class="pt-10 ">
                <ul class="grid grid-cols-2 border-t border-s border-e">
                    <li class="col-span-1 py-2 tracking-widest text-center cursor-pointer"
                        :class="{ 'border-e': index !== sheetData.length - 1, 'bg-gray-200/50 border-b text-gray-400': activeSheet !== sheet }"
                        v-for="(sheet, index) of sheetData" :key="sheet" @click="activeClick(sheet)">
                        {{ sheet }}
                    </li>
                </ul>
            </div> -->
            <OrderModal></OrderModal>
            <div class="p-4 my-10 border" v-show="activeSheet === '訂單'">
                <div class="px-4 py-2" v-for="(order, key) of orderAllData" :key="key">

                    <div class="flex justify-between py-2 text-sm text-center border md:p-4 md:text-start md:text-base">

                        <p class="font-medium text-red-500">
                            <span class="material-symbols-outlined">
                                order_approve
                            </span>
                            訂單編號 : {{ order.id }}
                        </p>
                        <button class="flex items-center px-2 text-sm text-white border rounded bg-red-400/80 hover:bg-red-400" type="button" @click="getSingleOrder(order.id)">
                            <p class="tracking-wide me-1">消費明細</p>
                            <span class="text-sm material-symbols-outlined">
                                open_in_new
                            </span>
                        </button>
                    </div>

                    <div class="flex flex-col p-4 text-sm border md:flex-row md:text-base">
                        <p class="flex-1 text-gray-500">訂單日期 : {{ formatTimestamp(order.create_at * 1000) }}</p>
                        <p class="flex-1 text-gray-500">總消費金額 : {{ order.total }}</p>
                    </div>

                    <div class="flex flex-col p-4 text-sm border md:flex-row md:text-base">
                        <p class="flex-1 text-gray-500">運送狀態 : {{ order.is_paid ? '黑貓宅配-常溫(台灣含離島)' : '-' }} </p>
                        <p class="flex-1 text-gray-500" v-if="order.is_paid">訂單狀態 : 訂單處理中</p>
                        <div class="flex items-center justify-between flex-1" v-else>
                            <p class="text-gray-500 me-3">訂單狀態 : 訂單建立中</p>
                            <RouterLink :to="`/ordercreate/${order.id}`"
                                class="flex items-center justify-center px-2 py-1 text-gray-400 hover:text-primary">
                                <span class="text-base material-symbols-outlined ">
                                    arrow_outward
                                </span>
                                前往付款
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import orderStore from '@/stores/order.js'

import formatTime from '@/mixins/time.js'

import OrderModal from '@/components/front/user/OrderModal.vue'

export default {
    components: {
        OrderModal
    },
    data() {
        return {
            sheetData: ['個人資訊', '訂單'],
            activeSheet: '訂單'
        }
    },
    mixins: [formatTime],
    computed: {
        ...mapState(orderStore, ['orderAllData', 'orderLoading'])
    },
    methods: {
        ...mapActions(orderStore, ['getAllOrder', 'getSingleOrder']),
        activeClick(sheet) {
            this.activeSheet = sheet
        }

    },
    mounted() {
        this.getAllOrder()
    }

}
</script>

<style lang="scss" scoped></style>