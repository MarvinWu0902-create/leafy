<template>
    <div>
        <Transition name="fade" enter-active-class="transition duration-300" leave-active-class="transition duration-300"
            enter-from-class="-translate-y-3 opacity-0" enter-to-class="translate-y-0 opacity-100"
            leave-from-class="translate-y-0 opacity-100" leave-to-class="-translate-y-3 opacity-0">
            <nav v-if="!canExpaned || innerisOpen"
                :class="{ 'hidden md:block': !canExpaned, 'block md:hidden text-center bg-main': innerisOpen }">
                <ul class="flex flex-col md:flex-row">
                    <li>
                        <RouterLink class="block hover:text-primary"
                            :class="{ 'px-3': !canExpaned, 'my-4': innerisOpen, 'text-primary': currentPath === '/about', 'text-secondary': currentPath !== '/about' }"
                            to="/about" @click="openClick">
                            關於我們</RouterLink>
                    </li>
                    <li>
                        <RouterLink class="block hover:text-primary"
                            :class="{ 'px-3': !canExpaned, 'mb-4': innerisOpen, 'text-primary': currentPath === '/productlist', 'text-secondary': currentPath !== '/productlist' }"
                            to="/productlist" @click="openClick">
                            商品列表</RouterLink>
                    </li>
                    <li>
                        <RouterLink class="block hover:text-primary"
                            :class="{ 'px-3': !canExpaned, 'mb-4': innerisOpen, 'text-primary': currentPath === '/service', 'text-secondary': currentPath !== '/service' }"
                            to="/service" @click="openClick">
                            常見問題</RouterLink>
                    </li>
                </ul>
            </nav>
        </Transition>
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import cartStore from '@/stores/cart';

export default {
  props: ['canExpaned', 'isOpen', 'openClick'],
  data() {
    return {
      innerisOpen: false,
      currentPath: '',
    };
  },
  methods: {
    ...mapActions(cartStore, ['cartClick']),
  },
  watch: {
    isOpen() {
      this.innerisOpen = this.isOpen;
    },
    $route(to) {
      this.currentPath = to.path;
    },
  },
};
</script>
