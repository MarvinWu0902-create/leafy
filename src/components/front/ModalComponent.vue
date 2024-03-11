<template>
    <div>
        <Transition name="fade" enter-active-class="transition duration-300"
            leave-active-class="transition duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100"
            leave-from-class="opacity-100 " leave-to-class="opacity-0">
            <div class="fixed inset-0 z-10 flex items-center justify-center bg-black/50" v-if="isModalShow">
            </div>
        </Transition>

        <Transition name="content" enter-active-class="transition duration-300"
            leave-active-class="transition duration-300" enter-from-class="opacity-0 translate-y-[100px]"
            enter-to-class="translate-y-0 opacity-100" leave-from-class="translate-y-0 opacity-100"
            leave-to-class="opacity-0 translate-y-[100px]">
            <div class="fixed inset-0 z-20 flex items-center justify-center" v-if="isModalShow">
                <div class="flex flex-col justify-between p-4 mx-3 overflow-x-auto bg-white rounded-lg shadow-lg w-80 h-2/3">
                    <div>
                        <header class="flex justify-between border-b">
                            <slot name="header"></slot>
                            <div class="flex flex-col justify-center me-3">
                                <a class="flex items-center justify-center cursor-pointer group" @click="closeModal">
                                    <span
                                        class="text-white transition duration-200 material-symbols-outlined group-hover:text-gray-300">
                                        close
                                    </span>
                                </a>
                            </div>
                        </header>
                        <section>
                            <slot name="section"></slot>
                        </section>
                    </div>
                    <footer class="flex justify-end p-1 md:p-4">
                        <slot name="footer"></slot>
                    </footer>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import modalStore from '@/stores/modal';

export default {
  computed: {
    ...mapState(modalStore, ['isModalShow']),
  },
  methods: {
    ...mapActions(modalStore, ['closeModal']),
  },
  watch: {
    isModalShow(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        this.currentimgIndex = -1;
        document.body.style.overflow = 'auto';
      }
    },
  },
};
</script>
