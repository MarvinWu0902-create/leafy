<template>
    <div>
        <Transition name="fade" enter-active-class="transition duration-300" leave-active-class="transition duration-300"
            enter-from-class="translate-x-3 opacity-0" enter-to-class="translate-x-0 opacity-100"
            leave-from-class="translate-x-0 opacity-100" leave-to-class="translate-x-3 opacity-0">

            <div class="fixed rounded-sm top-[10%] right-[10%]  bg-red-300 px-4 py-2 z-30"
                v-if="toastShow">
                <div class="flex items-center justify-between">
                    <p class="text-white me-3">{{ toastMsg.message }}</p>
                    <a class="flex items-center justify-between cursor-pointer " @click="closeToast">
                        <span class="text-sm text-white material-symbols-outlined">
                            close
                        </span>
                    </a>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
export default {
  data() {
    return {
      toastShow: false,
      timeoutId: null,
    };
  },
  props: ['toastMsg', 'showTime'],
  methods: {
    closeToast() {
      this.toastShow = false;
    },
    showHandler() {
      this.toastShow = true;
      this.timeoutId = setTimeout(() => {
        this.toastShow = false;
      }, this.showTime);
    },
    showToast() {
      // 如果有設置setTimeout則取消設置並直接消失
      if (this.timeoutId !== null) {
        this.toastShow = false;
        clearTimeout(this.timeoutId);
        // 延後.5s再顯示出來
        setTimeout(() => {
          this.showHandler();
        }, 500);
      } else {
        // 直接顯示
        this.showHandler();
      }
    },
  },
  watch: {
    toastMsg() {
      this.showToast();
    },
  },
};
</script>
