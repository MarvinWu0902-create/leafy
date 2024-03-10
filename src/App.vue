<template>
  <RouterView />
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  mounted() {
    AOS.init({
      offset: 100,
      duration: 600,
      easing: 'ease-in-sine',
      once: true,
    });
  },
};
</script>
