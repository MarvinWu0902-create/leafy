<template>
    <div>
        <SwalModal v-if="isswalShow" :title="swalConfig.title" :text="swalConfig.text" :icon="swalConfig.icon"
            :showCancelButton="swalConfig.showCancelButton" :confirmButtonText="swalConfig.confirmButtonText"
            :cancelButtonText="swalConfig.cancelButtonText" @status="swalHandler"></SwalModal>
        <ModalComponent>
            <template #header>
                <div class="p-4 text-white">{{ headerTitle }}</div>
            </template>
            <template #section>
                <div class="p-2 bg-gray-400/20">
                    <p>訂單狀態 : <span
                            :class="{ 'text-green-600': modalOrder.is_paid, 'text-red-600': !modalOrder.is_paid }">{{
            modalOrder.is_paid
                ? '已付款' : '未付款' }}</span></p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-1">
                        <h3 class="py-2 mt-4 font-bold border-b-2">訂購資訊</h3>
                        <ul class="mt-4 space-y-4">
                            <li class="flex justify-between">
                                <label for="create-time">建立時間 : </label>
                                <p>{{ formatTimestamp(modalOrder.create_at * 1000) }}</p>
                            </li>
                            <li class="flex justify-between">
                                <label for="e-mail">Email : </label>
                                <p>{{ modalOrder.user.email }}</p>
                            </li>
                            <li class="flex justify-between">
                                <label for="e-mail">收件人姓名 : </label>
                                <p>{{ modalOrder.user.name }}</p>
                            </li>
                            <li class="flex justify-between">
                                <label for="e-mail">電話 : </label>
                                <p>{{ modalOrder.user.tel }}</p>
                            </li>
                            <li class="flex justify-between">
                                <label for="e-mail">地址 : </label>
                                <p>{{ modalOrder.user.address }}</p>
                            </li>
                            <li class="flex justify-between">
                                <label for="e-mail">備註 : </label>
                                <p>{{ modalOrder.message }}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="col-span-1">
                        <div class="flex items-center justify-between py-2 mt-3 border-b-2">
                            <h3 class="font-bold">商品內容</h3>
                            <p><span class="text-sm">訂單金額 : </span><span class="text-xl font-bold text-red-400 ">{{
            modalOrder.total }}</span></p>
                        </div>

                        <ul class="mt-4 space-y-1 ">
                            <li v-for="(product, key) of modalOrder.products" :key="key">
                                <div class="flex justify-between">
                                    <div class="flex w-full">
                                        <div class="w-24 h-20">
                                            <img class="object-cover w-full h-full" :src="product?.product?.imageUrl"
                                                alt="#">
                                        </div>
                                        <div class="flex flex-col items-center justify-center w-24">
                                            <p>{{ product?.product?.title }}</p>
                                            <p>${{ product.final_total }} NTD</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-end w-full">
                                        <p class="text-sm">數量 : </p>
                                        <input
                                            class="w-20 h-8 p-1 mx-1 text-center border rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            type="number" v-model="product.qty">
                                        <button type="button" class="flex items-center justify-center group">
                                            <span
                                                class="text-gray-200 transition duration-300 material-symbols-outlined group-hover:text-red-500"
                                                @click="deleteClick(key)">
                                                delete
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </template>
            <template #footer>
                <button class="px-4 py-2 transition duration-200 border rounded hover:text-white hover:bg-gray-700 me-1"
                    type="button" @click="closeModal">關閉</button>
                <button
                    class="px-4 py-2 text-white transition duration-200 bg-gray-700 border rounded hover:bg-gray-800 "
                    type="button" @click="adjustOrder(modalOrder)">更新訂單</button>
            </template>
        </ModalComponent>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import orderStore from '@/stores/dashboard/order';
import modalStore from '@/stores/modal';

import ModalComponent from '@/components/dashboard/ModalComponent.vue';
import SwalModal from '@/components/SwalModal.vue';

import swalConfig from '@/mixins/swal';
import formatTime from '@/mixins/time';

export default {
  components: {
    ModalComponent,
    SwalModal,
  },
  mixins: [swalConfig, formatTime],
  data() {
    return {
      modalOrder: {},
      isswalShow: false,
      delProducttempID: '',
    };
  },
  watch: {
    tempOrder(newVal) {
      this.modalOrder = { ...newVal };
    },
  },
  computed: {
    ...mapState(modalStore, ['modalStatus']),
    ...mapState(orderStore, ['tempOrder', 'tempProductId']),
    headerTitle() {
      let title = '';
      if (this.modalStatus === 'get') {
        title = `訂單編號 : ${this.modalOrder.id}`;
      }
      return title;
    },
  },
  methods: {
    ...mapActions(modalStore, ['closeModal']),
    ...mapActions(orderStore, ['adjustOrder']),
    deleteClick(id) {
      this.isswalShow = true;
      this.delProducttempID = id;
    },
    delorderProduct() {
      delete this.modalOrder.products[this.delProducttempID];
    },
    swalHandler(status) {
      if (status === 'confirmed') {
        this.delorderProduct();
        this.adjustOrder(this.modalOrder);
      }
      this.isswalShow = false;
      this.delProducttempID = '';
    },
  },
  mounted() {
    this.newOrder = {};
  },
};
</script>
