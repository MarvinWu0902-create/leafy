<template>
    <div>
        <VueLoading :active="orderLoading.get" :can-cancel="true" :is-full-page="true" />
        <div class="container">

            <div class="pt-10 ">
                <ul class="grid grid-cols-5 gap-4 border">
                    <li class="col-span-1 py-2 text-center border">訂單</li>
                </ul>
            </div>
            <div class="p-4 border">
                <div class="px-4 py-2" v-for="(order, key) of orderAllData" :key="key">

                    <div class="p-4 border">

                        <p class="font-bold text-red-500">
                            <span class="material-symbols-outlined">
                                order_approve
                            </span>
                            訂單編號 : {{ order.id }}
                        </p>
                    </div>
                    <div class="flex p-4 border">
                        <p class="flex-1">訂單日期 : {{ formatTimestamp(order.create_at * 1000) }}</p>
                        <p class="flex-1">總消費金額 : {{ order.total }}</p>
                    </div>
                    <div class="flex p-4 border">
                        <p class="flex-1">運送狀態 : {{ order.is_paid ? '黑貓宅配-常溫(台灣含離島)' : '-' }} </p>
                        <p class="flex-1">訂單狀態 : {{ order.is_paid ? '訂單處理中' : '訂單建立中' }}</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import orderStore from '@/stores/order.js'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapState(orderStore, ['orderAllData', 'orderLoading'])
    },
    methods: {
        ...mapActions(orderStore, ['getAllOrder']),
        formatTimestamp(timestamp) {
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            return `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    },
    mounted() {
        this.getAllOrder()
    }

}
</script>

<style lang="scss" scoped></style>