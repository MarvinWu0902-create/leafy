<template>
    <div class="flex justify-between" v-show="currentPath !== '/' && currentPath !== '/about'">
        <div class="flex items-center">
            <div v-for="(match, index) of matchedAry" :Key="match.path">
                <component :is="currentName === match.name?'p':'RouterLink'" :to="match.path"
                    class="text-sm transition duration-300 text-primary"
                    :class="{ 'text-gray-300 hover:text-primary ': currentName !== match.name }">
                    {{ match.name }}
                </component>
                <span class="text-primary" v-show="index !== matchedAry.length - 1"
                    :class="{ 'text-gray-300': currentName !== match.name }">&nbsp;/&nbsp;
                </span>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            matchedAry: [],
            currentPath: '',
            currentName: '',
        }
    },
    methods: {
        routeHandler(route) {
            const { matched, path, name } = route;
            // 判斷是否為單一產品頁面
            matched.forEach((m) => {
                const { path, name } = m;
                if (name === '商品頁面') {
                    const listObj = [{ path: '/productlist', name: '商品列表' }, { path, name }];
                    this.matchedAry.push(...listObj);
                } else {
                    const obj = { path, name };
                    this.matchedAry.push(obj)
                }
            });
            this.currentPath = path;
            this.currentName = name;
        }
    },
    watch: {
        $route(to) {
            this.matchedAry = [];
            this.routeHandler(to)
        }
    },
    mounted() {
        this.routeHandler(this.$route)
    }
}
</script>
