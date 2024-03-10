<template>
    <div>
        <VueLoading :active="isloginLoading" :can-cancel="true" :is-full-page="true" />
        <div class="container relative">
            <Transition name="fade" enter-active-class="transition duration-500"
                leave-active-class="transition duration-500" enter-from-class="opacity-0 translate-y-[300px]"
                enter-to-class="translate-y-0 opacity-100" leave-from-class="translate-y-0 opacity-100"
                leave-to-class="opacity-0 translate-y-[300px]">
                <div class="absolute -translate-x-1/2 translate-y-1/2 top-1/2 left-1/2" v-if="isShow">
                    <div class="flex flex-col w-[500px] border-2 rounded p-4">
                        <p class="mb-4 text-3xl tracking-widest text-center">LOGIN</p>
                        <label class="mb-2 text-xl" for="account">帳號</label>
                        <input
                            class="p-2 mb-4 transition duration-300 bg-transparent border focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50"
                            id="account" type="text" v-model="userName" placeholder="請輸入信箱..." required>
                        <label class="mb-2 text-xl" for="password">密碼</label>
                        <input
                            class="p-2 mb-4 transition duration-300 bg-transparent border focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50"
                            id="password" type="password" v-model="passWord" @keyup.enter="login" placeholder="請輸入密碼..."
                            required>
                        <button class="py-2 mb-1 transition duration-300 border hover:bg-primary hover:text-white"
                            type="button" @click="login">登入</button>
                        <RouterLink
                            class="py-2 text-center transition duration-300 border hover:bg-primary hover:text-white"
                            to="/">
                            返回前台</RouterLink>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script>
import { apiLogin } from '@/api/login';

export default {
  data() {
    return {
      userName: '',
      passWord: '',
      isloginLoading: false,
      isShow: false,
    };
  },
  methods: {
    login() {
      this.isloginLoading = true;
      apiLogin(this.userName, this.passWord)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `MyToken=${token};expires=${new Date(expired)};path=/;`;
          this.isloginLoading = false;
          this.$router.push('/dashboard');
        })
        .catch(() => {
          this.isloginLoading = false;
          alert('帳號密碼錯誤!');
        });
    },
  },
  mounted() {
    setTimeout(() => {
      this.isShow = true;
    }, 1000);
  },
};
</script>

<style lang="scss" scoped></style>
