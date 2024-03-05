<template>
    <div>
        <Transition name="fade" enter-active-class="transition duration-300" leave-active-class="transition duration-300"
            enter-from-class="translate-x-3 opacity-0" enter-to-class="translate-x-0 opacity-100"
            leave-from-class="translate-x-0 opacity-100" leave-to-class="translate-x-3 opacity-0">
            <div :class="{ 'block': isVisible, 'hidden': !isVisible }">
                <button type="button"
                    class="fixed z-30 flex items-center justify-center p-2 duration-300 rounded cursor-pointer group bg-primary/20 hover:bg-primary/50 transition-sm bottom-10 right-10"
                    @click="scrollToTop">
                    <span class="transition duration-300 material-symbols-outlined text-white/70 group-hover:text-white/80">
                        arrow_upward_alt
                    </span>
                </button>
            </div>
        </Transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isVisible: false
        }
    },
    methods: {
        handleScroll() {
            this.isVisible = window.scrollY > 120;
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    }
}
</script>
