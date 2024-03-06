import { defineStore } from 'pinia'
import { apiadmingetProduct, apiadminadjustProduct, apiadminpostProduct, apiadmindeleteProduct } from '@/api/dashboard/product'
import modalStore from '@/stores/modal.js'

export default defineStore('dashboard-product', {
    state() {
        return {
            allproductData: [],
            productData: [],
            tempProduct: {
                imagesUrl: []
            },
            resInfo: {},
            filterCategory: 'all',
            categoryData: [],
            paginationData: {},
            currentPage: 0,
            productLoading: {
                getProduct: false,
                postProduct: false,
                adjustProduct: false,
                deleteProduct: false,
            },
        }
    },
    actions: {
        getProduct(category, page) {
            const { closeModal } = modalStore();
            this.currentPage = page
            this.productLoading.getProduct = true;
            apiadmingetProduct(category, page)
                .then((res) => {
                    if (category === 'all') {
                        this.allproductData = res.data.products;
                    }
                    this.productData = res.data.products;
                    this.paginationData = res.data.pagination;
                    this.productLoading.getProduct = false;
                    closeModal()
                })
                .catch(() => {
                    alert('取得產品資料失敗')
                })

        },
        deleteProduct(id) {
            this.productLoading.deleteProduct = true;
            apiadmindeleteProduct(id)
                .then((res) => {
                    this.productLoading.deleteProduct = false
                    this.resInfo = res.data
                    this.getProduct(this.filterCategory, this.currentPage)
                })
                .catch((err) => {
                    this.productLoading.deleteProduct = false
                    this.resInfo = err.response.data
                })
        },
        productBtbClick(type, product) {
            const { openModal, setmodalStatus, currentpageReset } = modalStore();
            if (type === 'add') {
                this.tempProduct = { imagesUrl: ['', '', ''] }
            } else if (type === 'adjust') {
                this.tempProduct = JSON.parse(JSON.stringify(product))
            } else {
                this.tempProduct = product;
            }
            setmodalStatus(type)
            currentpageReset()
            openModal()
        },
        modalConfirmClick(status, product) {
            if (status === 'adjust') {
                this.productLoading.adjustProduct = true;
                apiadminadjustProduct(product)
                    .then((res) => {
                        this.productLoading.adjustProduct = false;
                        this.resInfo = res.data
                        this.getProduct(this.filterCategory, this.currentPage)
                    })
                    .catch((err) => {
                        this.productLoading.adjustProduct = false;
                        this.resInfo = err.response.data

                    })
            } else if (status === 'add') {
                this.productLoading.postProduct = true
                apiadminpostProduct(product)
                    .then((res) => {
                        this.productLoading.postProduct = false
                        this.resInfo = res.data
                        this.getProduct(this.filterCategory, this.currentPage)
                    })
                    .catch((err) => {
                        this.productLoading.postProduct = false
                        this.resInfo = err.response.data

                    })
            }
        },
        categoryChange(category) {
            this.filterCategory = category
        }
    }
})