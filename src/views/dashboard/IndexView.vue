<template>
    <div class="flex flex-col h-screen" v-show="isAllow">
        <VueLoading :active="islogoutLoading" :can-cancel="true" :is-full-page="true" />
        <NavBar></NavBar>
        <div class="flex-1 pt-10 ms-1/6">
            <BreadCrumb class="container">
                <button type="button"
                    class="px-2 py-1 text-sm transition duration-300 bg-transparent border rounded-sm hover:bg-primary text-primary hover:text-white"
                    @click="loginOut">登出</button>
            </BreadCrumb>
            <RouterView class="h-screen "></RouterView>
        </div>
        <footer class=" bg-dark ms-1/6">
            <div class="container text-center text-secondary">
                <h3 class="py-2 text-xl ">LEAFY</h3>
                <div class="flex justify-center pb-2 text-xs">
                    <p> 本網站僅供個人作品使用，不提供商業用途 |
                        <RouterLink to="/">返回前台</RouterLink>
                    </p>
                </div>
                <p class="pb-4 text-xs ">LEAFY © 2024 copyright</p>
            </div>
        </footer>
    </div>
</template>

<script>
import { mapActions } from 'pinia'
import { apiloginCheck, apiLogout } from '@/api/login.js'
import tokenStore from '@/stores/dashboard/token.js'

import BreadCrumb from '@/components/BreadCrumb.vue'
import ToastCard from '@/components/ToastCard.vue'
import NavBar from '@/components/dashboard/NavBar.vue'

export default {
    components: {
        BreadCrumb,
        ToastCard,
        NavBar
    },
    data() {
        return {
            islogoutLoading: false,
            isAllow: false,
        }
    },
    methods: {
        ...mapActions(tokenStore, ['setHeaderToken']),
        isloginCheck() {
            apiloginCheck()
                .then((res) => {
                    if (!res.data.success) {
                        this.$router.push('/login')
                    } else {
                        this.isAllow = true;
                    }
                })
                .catch(() => {
                    this.$router.push('/login')
                })
        },
        loginOut() {
            this.islogoutLoading = true;
            apiLogout()
                .then(() => {
                    this.islogoutLoading = false;
                    this.$router.push('/login')
                })
                .catch(() => {
                    alert('登出失敗')
                })
        },
    },
    mounted() {
        this.isAllow = false;
        this.setHeaderToken();
        this.isloginCheck();
    }
}
</script>

<style lang="scss" scoped></style>