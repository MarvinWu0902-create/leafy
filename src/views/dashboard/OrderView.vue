<template>
    <div>
        <ToastCard :toast-msg="resInfo" :show-time="2000"></ToastCard>
        <OrderModal></OrderModal>
        <SwalModal v-if="isswalShow" :title="swalConfig.title" :text="swalConfig.text" :icon="swalConfig.icon"
            :showCancelButton="swalConfig.showCancelButton" :confirmButtonText="swalConfig.confirmButtonText"
            :cancelButtonText="swalConfig.cancelButtonText" @status="swalHandler"></SwalModal>
        <div class="container vl-parent">
            <VueLoading :active="orderLoading.getOrder || orderLoading.adjustOrder || orderLoading.deleteOrder"
            :can-cancel="true" :is-full-page="false" />
            <div class="flex justify-between my-4">
                <input type="text"
                    class="w-1/6 p-2 border rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50"
                    placeholder="請輸入查詢訂單編號" v-model="orderNumber">

            </div>
            <table class="w-full mb-10 border">
                <thead class="bg-gray-200/50">
                    <tr>
                        <th class="p-2 font-normal ">訂單時間</th>
                        <th class="p-2 font-normal ">訂單編號</th>
                        <th class="p-2 font-normal ">品項</th>
                        <th class="p-2 font-normal ">金額</th>
                        <th class="p-2 font-normal ">訂單狀態</th>
                        <th class="p-2 font-normal ">付款日期</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    <tr class="border-b" v-for="order of filterOrderData" :key="order.id">
                        <td class="p-2 text-center">{{ formatTimestamp(order.create_at * 1000) }}</td>
                        <td class="p-2 text-center">{{ order.id }}</td>
                        <td class="p-2 text-center">{{ Object.keys(order.products).length }}</td>
                        <td class="p-2 text-center">{{ order.total }}</td>
                        <td class="p-2 text-center"
                            :class="{ 'text-green-600': order.is_paid, 'text-red-600': !order.is_paid }">
                            {{ order.is_paid ? '已付款' : '未付款' }}</td>
                        <td class="p-2 text-center">{{ order.paid_date ? formatTimestamp(order.paid_date *
                            1000) : '' }}</td>
                        <td class="w-20">
                            <button
                                class="px-2 py-1 text-sm font-bold transition duration-200 bg-transparent border rounded text-stone-400 border-stone-400 hover:text-white hover:bg-stone-500"
                                @click="orderBtnClick('get', order.id)">查詢訂單</button>
                        </td>
                        <td class="w-20">
                            <button
                                class="px-2 py-1 text-sm font-bold text-red-400 transition duration-200 bg-transparent border border-red-400 rounded hover:text-white hover:bg-red-500"
                                @click="deleteClick(order.id)">刪除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <PaginationBtn :pagination-data="paginationData"></PaginationBtn>

        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import tokenStore from '@/stores/dashboard/token.js'
import orderStore from '@/stores/dashboard/order.js'

import OrderModal from '@/components/dashboard/order/OrderModal.vue'
import PaginationBtn from '@/components/dashboard/PaginationBtn.vue'
import ToastCard from '@/components/ToastCard.vue'
import SwalModal from '@/components/SwalModal.vue'

import swalConfig from '@/mixins/swal.js';
import formatTime from '@/mixins/time.js'

export default {
    components: {
        OrderModal,
        PaginationBtn,
        ToastCard,
        SwalModal,
    },
    mixins: [swalConfig, formatTime],
    data() {
        return {
            orderNumber: '',
            isswalShow: '',
            deltempOrderId: '',
        }
    },
    computed: {
        ...mapState(orderStore, ['orderData', 'paginationData', 'orderLoading', 'resInfo']),
        filterOrderData() {
            return this.orderData.filter((i) => this.orderNumber === '' ? true : i.id.includes(this.orderNumber))
        }
    },
    methods: {
        ...mapActions(tokenStore, ['setHeaderToken']),
        ...mapActions(orderStore, ['getOrder', 'orderBtnClick', 'deleteOrder']),
        deleteClick(id) {
            this.isswalShow = true
            this.deltempOrderId = id
        },
        swalHandler(status) {
            if (status === 'confirmed') {
                this.deleteOrder(this.deltempOrderId)
            }
            this.isswalShow = false
            this.delProducttempID = ''
        }
    },
    mounted() {
        this.setHeaderToken()
        this.getOrder(1)
    }
}
</script>

<style lang="scss" scoped></style>