<template>
    <div>
        <nav class="fixed w-1/6 h-screen p-4 text-black list-none border-r">
            <ul class="flex flex-col">
                <li class="mb-6">
                <div class="flex justify-center"><img class="object-cover w-20 h-16" src="/leafy_logo-removebg.png"
                        alt="logo"></div>
            </li>
            <li class="mb-1 transition rounded hover:text-primary-darker hover:bg-gray-100 during-300"
                :class="{ 'bg-gray-100 text-primary-darker': currentPath === '/dashboard' }">
                <RouterLink class="flex items-center p-2 " to="/dashboard">
                    <span class="text-2xl material-symbols-outlined me-2">
                        category
                    </span>
                    商品表單
                </RouterLink>
            </li>
            <li class="transition rounded hover:text-primary-darker hover:bg-gray-100 during-300"
                :class="{ 'bg-gray-100 text-primary-darker': currentPath === '/dashboard/order' }">
                <RouterLink class="flex items-center p-2 " to="/dashboard/order">
                    <span class="text-2xl material-symbols-outlined me-2">
                        list_alt
                    </span>
                    訂單管理
                </RouterLink>
            </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentPath: '/dashboard'
        }
    },
    watch: {
        '$route'(to) {
            this.currentPath = to.path;
        }
    },
    mounted() {
        this.currentPath = this.$route.path
    }
}
</script>
