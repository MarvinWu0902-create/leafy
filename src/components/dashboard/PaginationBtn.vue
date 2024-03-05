<template>
    <div>
        <div class="flex items-center justify-center mb-10 cursor-pointer pagination">
            <button type="button" class="flex items-center justify-center w-8 p-1 border previous hover:text-white hover:bg-primary rounded-s-md"
                @click="paginationClick(paginationData.current_page === 1 ? 1 : paginationData.current_page - 1)">
                <span class="material-symbols-outlined">
                    navigate_before
                </span>
            </button>
            <button type="button" class="block w-8 p-1 text-center border hover:text-white hover:bg-primary "
                :class="{ 'text-white bg-primary': paginationData.current_page === page, 'text-black bg-white': paginationData.current_page !== page }"
                v-for="page of paginationData.total_pages" :key="page" @click="paginationClick(page)">
                {{ page }}
            </button>
            <button type="button" class="flex items-center justify-center w-8 p-1 border next hover:text-white hover:bg-primary rounded-e-md"
                @click="paginationClick(paginationData.current_page === paginationData.total_pages ? paginationData.total_pages : paginationData.current_page + 1)">
                <span class="material-symbols-outlined">
                    navigate_next
                </span>
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'pinia'
import productStore from '@/stores/dashboard/product.js'
import orderStore from '@/stores/dashboard/order.js'

export default {
    props: ['paginationData', 'categoryData'],
    computed: {
        isMode() {
            if (this.categoryData) {
                return 'product'
            } else {
                return 'order'
            }
        }
    },
    methods: {
        ...mapActions(productStore, ['getProduct']),
        ...mapActions(orderStore, ['getOrder']),
        paginationClick(page) {
            if (this.isMode === 'product') {
                this.getProduct(this.categoryData, page)
            } else if (this.isMode === 'order') {
                this.getOrder(page)
            }
        }
    }
}
</script>
