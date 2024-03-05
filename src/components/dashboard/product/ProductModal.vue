<template>
    <div>
        <Modal>
            <template #header>
                <div class="p-4 text-white">{{ headerTitle }}</div>
            </template>
            <template #section>
                <div v-if="modalStatus === 'delete'">
                    <p>確定要刪除?</p>
                </div>
                <div v-else>
                    <div class="grid grid-cols-1 gap-4 mb-4 bg-gray-200 rounded-sm">
                        <ul class="flex p-2">
                            <li>
                                <button class="block px-4 py-2 rounded-sm" :class="{ 'bg-white': currentPage === 'info' }"
                                    type="button" @click="setcurrentPage('info')">
                                    商品資訊
                                </button>
                            </li>
                            <li>
                                <button class="block px-4 py-2 rounded-sm" type="button"
                                    :class="{ 'bg-white': currentPage === 'content' }" @click="setcurrentPage('content')">
                                    商品內容
                                </button>
                            </li>
                            <li>
                                <button class="block px-4 py-2 rounded-sm" type="button"
                                    :class="{ 'bg-white': currentPage === 'image' }" @click="setcurrentPage('image')">
                                    商品圖片
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div v-show="currentPage === 'info'">
                        <div class="grid grid-cols-3 gap-4 mb-4">
                            <div class="col-span-2">
                                <label for="name">
                                    商品名稱
                                    <span class="text-red-400">*</span>
                                </label>
                                <input
                                    class="w-full p-2 mt-1 border rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50"
                                    type="text" v-model="modalProduct.title">
                            </div>
                            <div class="col-span-1">
                                <label for="name">
                                    商品類別
                                    <span class="text-red-400">*</span>
                                </label>
                                <input
                                    class="w-full p-2 mt-1 border rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50"
                                    type="text" v-model="modalProduct.category">
                            </div>
                        </div>
                        <div class="grid grid-cols-3 gap-4 mb-4">
                            <div class="col-span-1">
                                <label for="origin-price">
                                    原價
                                    <span class="text-red-400">*</span>
                                </label>
                                <input id="origin-price"
                                    class="w-full p-2 mt-1 border rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50"
                                    type="text" v-model.number="modalProduct.origin_price">
                            </div>
                            <div class="col-span-1">
                                <label for="price">
                                    售價
                                    <span class="text-red-400">*</span>
                                </label>
                                <input id="price"
                                    class="w-full p-2 mt-1 border rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50"
                                    type="text" v-model.number="modalProduct.price">
                            </div>
                            <div class="col-span-1">
                                <label for="unit">
                                    單位
                                    <span class="text-red-400">*</span>
                                </label>
                                <input id="unit"
                                    class="w-full p-2 mt-1 border rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50"
                                    type="text" v-model="modalProduct.unit">
                            </div>
                            <div class="col-span-1">
                                <label for="enabled">
                                    是否啟用
                                    <span class="text-red-400">*</span>
                                </label>
                                <input class="ms-3" type="checkbox" id="enabled" v-model="isEnabled">
                            </div>
                        </div>
                    </div>
                    <div v-show="currentPage === 'content'">
                        <div class="grid grid-cols-1 gap-4 mb-4">
                            <div class="col-span-1">
                                <label for="name">
                                    商品描述
                                    <span class="text-red-400">*</span>
                                </label>
                                <textarea
                                    class="w-full p-2 mt-1 border rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50"
                                    name="description" id="description" rows="5"
                                    v-model="modalProduct.description"></textarea>

                            </div>
                        </div>
                        <div class="grid grid-cols-1 gap-4 mb-4">
                            <div class="col-span-1">
                                <label for="name">
                                    商品內容
                                    <span class="text-red-400">*</span>
                                </label>
                                <input
                                    class="w-full p-2 mt-1 border rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50"
                                    type="text" v-model="modalProduct.content">
                            </div>
                        </div>
                    </div>
                    <div v-show="currentPage === 'image'">
                        <h3>主圖 <span class="text-red-400">*</span></h3>
                        <div class="grid grid-cols-3 gap-4 mb-4">
                            <div class="relative col-span-1" :class="{ 'h-40': modalProduct.imageUrl }">

                                <img class="object-cover w-full h-full" :class="{ 'opacity-50': ismainEditing }"
                                    :src="modalProduct.imageUrl" alt="#" v-if="modalProduct.imageUrl">
                                <span
                                    class="transition duration-300 cursor-pointer material-symbols-outlined text-8xl text-gray-400/30 hover:text-gray-400/50"
                                    @click="mainimgClick" v-else>
                                    crop_free
                                </span>
                                <span
                                    class="after:absolute  after:content-['編輯中'] after:cursor-pointer after:text-center after:top-1/2 after:-translate-y-1/2 after:left-0 after:w-full after:h-1/6 after:bg-yellow-400/20 after:hover:bg-yellow-400 after:transition after:duration-300 after:text-white after:tracking-widest"
                                    @click="mainimgClick" v-if="ismainEditing && modalProduct.imageUrl">
                                </span>
                                <span
                                    class="after:absolute  after:content-['點選編輯'] after:cursor-pointer after:text-center after:bottom-0 after:left-0 after:w-full after:h-1/6 after:bg-yellow-400/20 after:hover:bg-yellow-400 after:transition after:duration-300 after:text-white after:tracking-widest"
                                    @click="mainimgClick" v-else-if="!ismainEditing && modalProduct.imageUrl">
                                </span>
                                <span
                                    class="after:absolute  after:content-['']  after:top-6 after:right-2 after:w-4 after:h-1 after:-translate-x-1/2 after:-translate-y-1/2  after:bg-white/80"></span>
                                <span
                                    class="before:absolute before:cursor-pointer  before:content-[''] before:top-2 before:right-2 before:w-8 before:h-8  before:rounded-full  before:bg-white/30 before:hover:bg-white/40 after:transition after:duration-300"
                                    @click="removeMainImg"></span>

                            </div>
                        </div>

                        <div class="flex items-center" v-show="ismainEditing">
                            <input type="text"
                                class="w-full p-2 border rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50"
                                v-model="modalProduct.imageUrl">
                            <button type="button" class="w-20 p-2 border rounded" @click="ismainEditing = false">確認</button>
                        </div>

                        <h3>副圖 <span class="text-red-400">*</span></h3>
                        <div class="grid grid-cols-3 gap-4 mb-4">
                            <template v-for="(image, index) of modalProduct.imagesUrl" :key="image">
                                <div class="relative col-span-1" :class="{ 'h-40': modalProduct.imagesUrl[index] }">
                                    <img class="object-cover w-full h-full"
                                        :class="{ 'opacity-50': currentimgIndex === index }"
                                        :src="modalProduct.imagesUrl[index]" alt="#" v-if="modalProduct.imagesUrl[index]">

                                    <span
                                        class="transition duration-300 cursor-pointer material-symbols-outlined text-8xl text-gray-400/30 hover:text-gray-400/50"
                                        @click="imgClick(index)" v-else>
                                        crop_free
                                    </span>

                                    <span
                                        class="after:absolute  after:content-['編輯中'] after:cursor-pointer after:text-center after:top-1/2 after:-translate-y-1/2 after:left-0 after:w-full after:h-1/6 after:bg-yellow-400/20 after:hover:bg-yellow-400 after:transition after:duration-300 after:text-white after:tracking-widest"
                                        @click="imgClick(index)"
                                        v-if="currentimgIndex === index && modalProduct.imagesUrl[index]">
                                    </span>
                                    <span
                                        class="after:absolute  after:content-['點選編輯'] after:cursor-pointer after:text-center after:bottom-0 after:left-0 after:w-full after:h-1/6 after:bg-yellow-400/20 after:hover:bg-yellow-400 after:transition after:duration-300 after:text-white after:tracking-widest"
                                        @click="imgClick(index)"
                                        v-else-if="currentimgIndex !== index && modalProduct.imagesUrl[index]">
                                    </span>
                                    <span
                                        class="after:absolute  after:content-['']  after:top-6 after:right-2 after:w-4 after:h-1 after:-translate-x-1/2 after:-translate-y-1/2  after:bg-white/80"></span>
                                    <span
                                        class="before:absolute before:cursor-pointer  before:content-[''] before:top-2 before:right-2 before:w-8 before:h-8  before:rounded-full  before:bg-white/30 before:hover:bg-white/40 after:transition after:duration-300"
                                        @click="removeSecImg(index)"></span>
                                </div>
                            </template>
                        </div>
                        <div class="flex items-center" v-show="currentimgIndex !== -1">
                            <input type="text"
                                class="w-full p-2 border rounded focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary/50"
                                v-model="modalProduct.imagesUrl[currentimgIndex]" v-show="currentimgIndex !== -1">
                            <button type="button" class="w-20 p-2 border rounded" @click="urleditConfrim">確認</button>
                        </div>

                    </div>
                </div>
            </template>
            <template #footer>
                <button class="px-4 py-2 transition duration-200 border rounded hover:text-white hover:bg-gray-700 me-1"
                    type="button" @click="closeModal">取消</button>
                <button class="px-4 py-2 text-white transition duration-200 bg-gray-700 border rounded hover:bg-gray-800 "
                    type="button" @click="modalConfirmClick(modalStatus, modalProduct)">確認</button>
            </template>
        </Modal>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import productStore from '@/stores/dashboard/product.js'
import tokenStore from '@/stores/dashboard/token.js'
import modalStore from '@/stores/dashboard/modal.js'

import Modal from '@/components/dashboard/Modal.vue'

export default {
    components: {
        Modal,
    },
    data() {
        return {
            modalProduct: {},
            currentimgIndex: -1,
            ismainEditing: false,
        }
    },
    watch: {
        filterCategory(newVal) {
            this.getProduct(newVal, 1)
        },
        tempProduct(newVal) {
            this.modalProduct = { ...newVal }
        },

    },
    computed: {
        ...mapState(productStore, ['tempProduct', 'resInfo', 'filterCategory', 'productLoading']),
        ...mapState(modalStore, ['isModalShow', 'modalStatus', 'currentPage']),
        categoryData() {
            return [...new Set(this.allproductData.map((i) => i.category))]
        },
        headerTitle() {
            if (this.modalStatus === 'adjust') {
                return '編輯商品'
            } else if (this.modalStatus === 'add') {
                return '新增商品'
            } else {
                return '刪除商品'
            }
        },
        isEnabled: {
            get() {
                return this.modalProduct.is_enabled === 1;
            },
            set(value) {
                this.modalProduct.is_enabled = value ? 1 : 0;
            }
        }
    },
    methods: {
        ...mapActions(productStore, ['getProduct', 'modalConfirmClick']),
        ...mapActions(tokenStore, ['setHeaderToken']),
        ...mapActions(modalStore, ['closeModal', 'setcurrentPage']),
        imgClick(index) {
            if (this.currentimgIndex === index) {
                this.currentimgIndex = -1;
            } else {
                this.currentimgIndex = index;
            }
        },
        urleditConfrim() {
            this.currentimgIndex = -1;
        },
        mainimgClick() {
            this.ismainEditing = !this.ismainEditing
        },
        removeMainImg() {
            this.modalProduct.imageUrl = ''
            this.ismainEditing = false
        },
        removeSecImg(index) {
            this.modalProduct.imagesUrl[index] = ''
            this.currentimgIndex = -1
        }
    },

    mounted() {
        this.setHeaderToken();
    }
}
</script>
