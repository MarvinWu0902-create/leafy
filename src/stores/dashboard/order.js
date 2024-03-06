import { defineStore } from 'pinia'
import { apiadmingetOrder, apiadminadjustOrder, apiadmindeleteOrder } from '@/api/dashboard/order.js'
import modalStore from '@/stores/modal.js'

export default defineStore('dashboard-order', {
    state() {
        return {
            orderData: [],
            paginationData: [],
            resInfo: {},
            orderLoading: {
                getOrder: false,
                adjustOrder: false,
                deleteOrder: false
            },
            tempId: '',
            tempProductId: '',
            currentPage: 0,
        }
    },
    getters: {
        tempOrder() {
            return this.orderData.filter((i) => i.id === this.tempId)[0]
        }
    },
    actions: {
        getOrder(page) {
            this.currentPage = page
            this.orderLoading.getOrder = true
            apiadmingetOrder(page)
                .then((res) => {
                    this.orderLoading.getOrder = false
                    const { orders, pagination } = res.data
                    this.orderData = orders
                    this.paginationData = pagination
                })
                .catch(() => {
                    alert('取得訂單資料失敗')
                })
        },
        orderBtnClick(type, id) {
            const { openModal, setmodalStatus } = modalStore();
            this.tempId = id
            setmodalStatus(type)
            openModal()
        },
        adjustOrder(order) {
            let finalTatal = 0
            Object.keys(order.products).forEach((key) => {
                const product = order.products[key]
                const { origin_price, price } = product.product
                const { qty } = product;
                product.final_total = price * qty
                product.total = origin_price * qty
                finalTatal += product.final_total
            })
            order.total = finalTatal

            this.orderLoading.adjustOrder = true
            apiadminadjustOrder(order)
                .then((res) => {
                    this.resInfo = res.data
                    return apiadmingetOrder(this.currentPage)
                })
                .then((res) => {
                    this.orderLoading.adjustOrder = false
                    const { orders, pagination } = res.data
                    this.orderData = orders
                    this.paginationData = pagination
                })
                .catch((err) => {
                    this.orderLoading.adjustOrder = false
                    this.resInfo = err.response.data
                })
        },
        deleteOrder(id) {
            this.orderLoading.deleteOrder = true
            apiadmindeleteOrder(id)
                .then((res) => {
                    this.orderLoading.deleteOrder = false
                    this.resInfo = res.data
                    this.getOrder(this.currentPage)
                })
                .catch((err) => {
                    this.resInfo = err.response.data
                })

        }
    }
})