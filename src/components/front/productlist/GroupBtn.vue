<template>
    <div class="flex justify-center" v-show="!productLoading.getProduct">
        <button type="button" class="w-8 p-1 mx-1 text-sm text-center transition duration-300 border md:w-20 md:text-base hover:bg-primary hover:text-white"
            :class="{ 'text-primary bg-transparent': activeGroup !== group, 'text-white bg-primary': activeGroup === group }"
            v-for="group of getGroupAry" :key="group" @click="getGroup(group)">
            {{ group }}
        </button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import productStore from '@/stores/product';

export default {
  computed: {
    ...mapState(productStore, ['getGroupAry', 'activeGroup', 'productLoading']),
  },
  methods: {
    ...mapActions(productStore, ['getGroup', 'setDefaultGroup']),
  },
  mounted() {
    this.setDefaultGroup();
  },
};
</script>
