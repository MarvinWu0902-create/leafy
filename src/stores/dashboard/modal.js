import { defineStore } from 'pinia'

export default defineStore('dashboard-modal', {
    state() {
        return {
            isModalShow: false,
            modalStatus: '',
            currentPage: 'info',
        }
    },
    actions: {
        openModal() {
            this.isModalShow = true
        },
        closeModal() {
            this.isModalShow = false
        },
        setmodalStatus(status) {
            this.modalStatus = status
        },
        setcurrentPage(page) {
            this.currentPage = page
        },
        currentpageReset(){
            this.currentPage='info'
        }
    }
})