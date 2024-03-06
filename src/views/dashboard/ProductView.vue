<template>
    <div>
        <VueLoading :active="productLoading.getProduct || productLoading.adjustProduct || productLoading.deleteProduct"
            :can-cancel="true" :is-full-page="true" />
        <ToastCard :toast-msg="resInfo" :show-time="2000"></ToastCard>
        <SwalModal v-if="isswalShow" :title="swalConfig.title" :text="swalConfig.text" :icon="swalConfig.icon"
            :showCancelButton="swalConfig.showCancelButton" :confirmButtonText="swalConfig.confirmButtonText"
            :cancelButtonText="swalConfig.cancelButtonText" @status="swalHandler"></SwalModal>
        <ProductModal></ProductModal>
        <div class="container">
            <div class="flex items-end justify-between my-4">
                <select class="w-24 p-2 border rounded cursor-pointer focus:outline-none" name="category"
                    v-model="currentCategory" required>
                    <option value="all">全部</option>
                    <option :value="category" v-for="category of categoryData" :key="category">
                        {{ category }}
                    </option>
                </select>
                <div>
                    <button
                        class="flex items-center justify-center px-2 py-1 text-sm font-bold tracking-wider text-white transition duration-300 bg-teal-500 border border-teal-500 rounded hover:text-teal-500 hover:bg-transparent"
                        type="button" @click="productBtbClick('add')">
                        <span class="text-base leading-4 material-symbols-outlined me-1">
                            add_circle
                        </span>
                        <p class="text-sm">新增商品</p>
                    </button>
                </div>
            </div>
            <table class="w-full mb-10 border">
                <thead class="bg-gray-200/50">
                    <tr>
                        <th class="p-2 font-normal ">分類</th>
                        <th class="p-2 font-normal ">商品名稱</th>
                        <th class="p-2 font-normal ">原價</th>
                        <th class="p-2 font-normal ">售價</th>
                        <th class="p-2 font-normal ">啟用</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b" v-for="product of productData" :key="product.id">
                        <td class="p-2 text-center">{{ product.category }}</td>
                        <td class="p-2 text-center">{{ product.title }}</td>
                        <td class="p-2 text-center">{{ product.origin_price }}</td>
                        <td class="p-2 text-center">{{ product.price }}</td>
                        <td class="flex justify-center p-2 text-center">
                            <span class="material-symbols-outlined "
                                :class="{ 'text-green-600': product.is_enabled, 'text-red-600': !product.is_enabled }">
                                {{ product.is_enabled ? 'check_circle' : 'cancel' }}
                            </span>
                        </td>
                        <td class="w-20">
                            <button
                                class="px-2 py-1 text-sm font-bold transition duration-200 bg-transparent border rounded border-stone-400 text-stone-400 hover:text-white hover:bg-stone-500"
                                @click="productBtbClick('adjust', product)">編輯</button>
                        </td>
                        <td class="w-20">
                            <button
                                class="px-2 py-1 text-sm font-bold text-red-500 transition duration-200 bg-transparent border border-red-500 rounded hover:text-white hover:bg-red-500"
                                @click="deleteClick(product.id)">刪除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <PaginationBtn :pagination-data="paginationData" :category-data="currentCategory"></PaginationBtn>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import productStore from '@/stores/dashboard/product.js'
import tokenStore from '@/stores/dashboard/token.js'
import modalStore from '@/stores/modal.js'

import PaginationBtn from '@/components/dashboard/PaginationBtn.vue'
import ProductModal from '@/components/dashboard/product/ProductModal.vue'
import ToastCard from '@/components/ToastCard.vue'
import SwalModal from '@/components/SwalModal.vue'

import swalConfig from '@/mixins/swal.js';

export default {
    components: {
        PaginationBtn,
        ProductModal,
        ToastCard,
        SwalModal,
    },
    mixins: [swalConfig],
    data() {
        return {
            currentCategory: 'all',
            isswalShow: false,
            delProducttempID: '',
        }
    },
    computed: {
        ...mapState(productStore, ['allproductData', 'productData', 'resInfo', 'filterCategory', 'paginationData', 'productLoading']),
        ...mapState(modalStore, ['isModalShow', 'modalStatus', 'currentPage']),
        categoryData() {
            return [...new Set(this.allproductData.map((i) => i.category))]
        },
    },
    watch: {
        currentCategory(newVal) {
            this.categoryChange(newVal)
        },
    },
    methods: {
        ...mapActions(productStore, ['getProduct', 'deleteProduct', 'productBtbClick', 'categoryChange']),
        ...mapActions(tokenStore, ['setHeaderToken']),
        ...mapActions(modalStore, ['openModal', 'closeModal']),
        deleteClick(id) {
            this.isswalShow = true
            this.delProducttempID = id
        },
        swalHandler(status) {
            if (status === 'confirmed') {
                this.deleteProduct(this.delProducttempID)
            }
            this.isswalShow = false
            this.delProducttempID = ''
        },
    },
    mounted() {
        this.setHeaderToken()
        this.getProduct('all', 1)
    }
}
</script>

<style lang="scss" scoped></style>@/stores/modal.js