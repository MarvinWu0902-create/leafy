<template>
    <div class="flex flex-col h-screen">
        <VueLoading :active="cartLoading.getCart" :can-cancel="true" :is-full-page="true" />
        <!-- Menu Mask -->
        <div class="mask" :class="{ 'fixed overflow-hidden inset-0 bg-black bg-opacity-20 z-10': ismeunOpen }"></div>
        <!-- Toast -->
        <ToastCard :toast-msg="resInfo" :show-time="2000"></ToastCard>
        <!-- ToTop -->
        <ScrollTop></ScrollTop>
        <!-- 購物車 -->
        <ShopCart></ShopCart>

        <header class="fixed top-0 z-10 w-full bg-main ">

            <div class="container flex justify-between">
                <div class="flex items-center menu">
                    <h1 class="p-2">
                        <RouterLink to="/">
                            <img class="w-[120px] h-[60px] object-contain" src="/leafy_logo-removebg.png" alt="logo">
                        </RouterLink>
                    </h1>
                    <NavBar :can-expaned="false"></NavBar>
                </div>
                <!-- 購物車 -->
                <div class="flex items-center mx-4 space-x-5 shop">

                    <RouterLink class="w-5 h-5 cursor-pointer" to="/userinfo">
                        <span class="material-symbols-outlined text-secondary hover:text-primary">
                            list_alt
                        </span>
                    </RouterLink>

                    <a class="relative w-5 h-5 cursor-pointer " @click="cartClick">
                        <span class="material-symbols-outlined text-secondary hover:text-primary">
                            shopping_cart
                        </span>
                        <span
                            class="absolute w-5 h-5 text-xs font-bold leading-5 text-center text-white bg-red-400 rounded-full -top-1/2 -right-1/2">{{
                                cartData.length }}</span>
                    </a>

                    <a class="block w-6 h-6 cursor-pointer md:hidden ms-4" @click="menuClick">
                        <span class="material-symbols-outlined text-secondary hover:text-primary">
                            menu
                        </span>
                    </a>

                </div>
            </div>
            <!-- mobile nav -->
            <div class="absolute top-[76px] left-0 w-full">
                <div class="mobile-menu">
                    <NavBar :can-expaned="true" :is-open="ismeunOpen" :open-click="menuClick"></NavBar>
                </div>
            </div>
        </header>

        <div class="flex-1 mt-[76px]">
            <RouterView></RouterView>
        </div>

        <footer class=" bg-dark">
            <div class="container text-center text-secondary">
                <h3 class="pt-4 pb-2 text-xl ">LEAFY</h3>
                <div class="flex justify-center pb-2 text-xs">
                    <p> 本網站僅供個人作品使用，不提供商業用途</p>
                    <span class="hidden mx-1 md:block"> | </span>
                    <RouterLink class="hidden md:block" to="/dashboard">登入後台</RouterLink>
                </div>
                <p class="pb-4 text-xs ">LEAFY © 2024 copyright</p>
            </div>
        </footer>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import cartStore from '@/stores/cart';

import NavBar from '@/components/front/NavBar.vue';
import ShopCart from '@/components/front/ShopCart.vue';
import ScrollTop from '@/components/front/ScrollTop.vue';
import ToastCard from '@/components/ToastCard.vue';
import { RouterLink } from 'vue-router';

export default {
  components: {
    NavBar,
    ShopCart,
    ScrollTop,
    ToastCard,
    RouterLink,
  },
  data() {
    return {
      ismeunOpen: false,
    };
  },
  computed: {
    ...mapState(cartStore, ['cartData', 'finaltotalPrice', 'totalPrice', 'cartLoading', 'iscartOpen', 'resInfo']),
  },
  methods: {
    menuClick() {
      this.ismeunOpen = !this.ismeunOpen;
    },
    ...mapActions(cartStore, ['getCart', 'addCart', 'deleteCart', 'cartClick']),
  },
  watch: {
    ismeunOpen(newval) {
      document.body.classList.toggle('overflow-hidden', newval);
    },
    iscartOpen(newval) {
      if (newval) {
        this.ismeunOpen = false;
      }
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
