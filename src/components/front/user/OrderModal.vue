<template>
    <div>
        <ModalComponent>
            <template #header>
                <div class="p-1 md:p-4">
                    <h3 class="font-medium ">消費金額明細</h3>
                </div>
            </template>

            <template #section>
                <!-- 優惠 -->
                <div class="p-1 border-b md:p-4">
                    <h3 class="mb-1">已享用之優惠</h3>
                    <DiscountBar class="mb-2" :color="'bg-green-400/50'" v-show="isoverFreightLimit">
                        <template #name>免運優惠</template>
                        <template #content>滿${{ freightLimit }}免運</template>
                    </DiscountBar>
                    <DiscountBar :color="'bg-red-400/50'">
                        <template #name>活動優惠</template>
                        <template #content>季活動促銷</template>
                    </DiscountBar>
                </div>
                <!-- 小計/運費 -->
                <div class="p-1 border-b md:p-4">
                    <div class="flex justify-between">
                        <p class="mb-1 md:mb-4">小計:</p>
                        <p>NT${{ orderData.total }}</p>
                    </div>
                    <div class="flex justify-between">
                        <p class="mb-1 md:mb-4">運費:</p>
                        <p>{{ isoverFreightLimit ? '免運' : freightPrice }}</p>
                    </div>
                </div>
                <!-- 合計 -->
                <div class="p-1 md:p-4">
                    <div class="flex justify-between">
                        <p class="mb-1 md:mb-4">合計:</p>
                        <p>NT${{ orderData.total }}</p>
                    </div>
                </div>
            </template>

            <template #footer>
                <button type="button" class="w-full py-1 text-white bg-red-400" @click="closeModal">關閉</button>
            </template>
        </ModalComponent>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';

import DiscountBar from '@/components/front/order/DiscountBar.vue';
import ModalComponent from '@/components/front/ModalComponent.vue';

import orderStore from '@/stores/order';
import modalStore from '@/stores/modal';

export default {
  components: {
    ModalComponent,
    DiscountBar,
  },
  data() {
    return {
      freightPrice: 20,
      freightLimit: 100,
    };
  },
  watch: {
    orderData(newVal) {
      if (newVal) {
        this.openModal();
      }
    },
  },
  computed: {
    ...mapState(orderStore, ['orderData']),
    isoverFreightLimit() {
      return this.orderData.total >= this.freightLimit;
    },
  },
  methods: {
    ...mapActions(modalStore, ['openModal', 'closeModal']),
  },
};
</script>

<style lang="scss" scoped></style>@/stores/modal.js
