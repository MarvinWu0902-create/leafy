<template>
    <div>
        <div class="container flex justify-center" v-show="isShow">
            <div class="flex w-[600px]">

                <div class="w-full h-10">
                    <div class="relative w-full h-full mb-1 text-center">
                        <span class="absolute z-10 text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">1</span>

                        <span
                            class="before:absolute before:top-1/2 before:left-1/2 before:h-[2px] before:w-1/2 before:bg-gray-200"></span>
                        <span
                            class="after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:content-[''] after:w-8 after:h-8 md:after:w-10 md:after:h-10 after:rounded-full"
                            :class="{ 'after:bg-primary': orderStatus === 'check', 'after:bg-gray-200': orderStatus !== 'check' }"></span>

                    </div>
                    <div>
                        <p class="text-sm text-center">確認訂單</p>
                    </div>
                </div>

                <div class="w-full h-10">
                    <div class="relative w-full h-full mb-1 text-center">
                        <span class="absolute z-10 text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">2</span>

                        <span
                            class="before:absolute before:top-1/2 before:left-0 before:h-[2px] before:w-full before:bg-gray-200"></span>
                        <span
                            class="after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:content-[''] after:w-8 after:h-8 md:after:w-10 md:after:h-10 after:rounded-full"
                            :class="{ 'after:bg-primary': orderStatus === 'create', 'after:bg-gray-200': orderStatus !== 'create' }"></span>
                    </div>
                    <div>
                        <p class="text-sm text-center">建立訂單</p>
                    </div>
                </div>

                <div class="w-full h-10">
                    <div class="relative w-full h-full mb-1 text-center">
                        <span class="absolute z-10 text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">3</span>

                        <span
                            class="before:absolute before:top-1/2 before:left-0 before:h-[2px] before:w-1/2 before:bg-gray-200"></span>
                        <span
                            class="after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:content-[''] after:w-8 after:h-8 md:after:w-10 md:after:h-10 after:rounded-full"
                            :class="{ 'after:bg-primary': orderStatus === 'finish', 'after:bg-gray-200': orderStatus !== 'finish' }"></span>
                    </div>
                    <div>
                        <p class="text-sm text-center">確認訂單</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'pinia';
import orderStore from '@/stores/order';

export default {
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    ...mapState(orderStore, ['orderStatus']),
  },
  watch: {
    orderStatus() {
      this.isShow = true;
    },
  },
};
</script>
