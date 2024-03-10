<template>
    <div>
        <div v-if="isVisible">
            <button type="button"
                class="fixed z-30 flex items-center justify-center p-2 duration-300 rounded cursor-pointer group bg-primary/20 hover:bg-primary/50 transition-sm bottom-10 right-10"
                @click="scrollToTop">
                <span class="transition duration-300 material-symbols-outlined text-white/70 group-hover:text-white/80">
                    arrow_upward_alt
                </span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    handleScroll() {
      this.isVisible = window.scrollY > 120;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
      });
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
};
</script>
