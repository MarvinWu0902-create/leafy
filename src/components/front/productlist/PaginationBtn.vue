<template>
    <div>
        <div class="flex items-center justify-center cursor-pointer" v-show="!productLoading.getProduct">
            <a class="flex items-center justify-center w-8 p-1 border hover:text-white hover:bg-primary rounded-s-md"
                @click="getPage(paginationConfig.currentPage === 1 ? 1 : paginationConfig.currentPage - 1)">
                <span class="material-symbols-outlined">
                    navigate_before
                </span>
            </a>
            <a class="w-8 p-1 text-center border hover:text-white hover:bg-primary "
                :class="{ 'text-white bg-primary': paginationConfig.currentPage === page, 'text-primary bg-white': paginationConfig.currentPage !== page }"
                v-for="page of totalPages" :key="page" @click="getPage(page)">
                {{ page }}
            </a>
            <a class="flex items-center justify-center w-8 p-1 border hover:text-white hover:bg-primary rounded-e-md"
                @click="getPage(paginationConfig.currentPage === totalPages ? totalPages : paginationConfig.currentPage + 1)">
                <span class="material-symbols-outlined">
                    navigate_next
                </span>
            </a>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import productStore from '@/stores/product.js'
export default {
    computed: {
        ...mapState(productStore, ['paginationConfig', 'totalPages', 'productLoading'])
    },
    methods: {
        ...mapActions(productStore, ['getPage'])
    }
}
</script>
