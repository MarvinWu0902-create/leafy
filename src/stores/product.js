import { defineStore } from 'pinia';
import { apigetProduct, apigetsingleProduct, apigetRelatedProduct } from '@/api/product';

export default defineStore('product', {
  state() {
    return {
      productData: [],
      singleData: {},
      activeGroup: '全部',
      paginationConfig: {
        limitCount: 9,
        currentPage: 1,
      },
      productLoading: {
        getProduct: false,
        getSingle: false,
      },
    };
  },
  getters: {
    getGroupAry({ productData }) {
      return ['全部', ...new Set(productData.map((i) => i.category))];
    },
    totalPages({ paginationConfig }) {
      const { limitCount } = paginationConfig;
      return Math.ceil(this.groupProductData.length / limitCount);
    },
    groupProductData({ productData, activeGroup }) {
      if (activeGroup === '全部') {
        return productData;
      }
      return productData.filter((i) => i.category === activeGroup);
    },
    filterProductData({ paginationConfig }) {
      const { limitCount, currentPage } = paginationConfig;
      return this.groupProductData.slice((currentPage - 1) * limitCount, currentPage * limitCount);
    },
  },
  actions: {
    getProduct() {
      this.productLoading.getProduct = true;
      apigetProduct()
        .then((res) => {
          this.productData = res.data.products;
          this.productLoading.getProduct = false;
        })
        .catch(() => {
          alert('取得產品資料失敗');
        });
    },
    getsingleProduct(id) {
      this.productLoading.getSingle = true;
      apigetsingleProduct(id)
        .then((res) => {
          this.singleData = res.data.product;
          return apigetRelatedProduct(this.singleData.category);
        })
        .then((res) => {
          this.productData = res.data.products;
          this.productLoading.getSingle = false;
        })
        .catch(() => {
          alert('取得單一產品資料失敗');
        });
    },
    getGroup(group) {
      this.paginationConfig.currentPage = 1;
      this.activeGroup = group;
    },
    setDefaultGroup() {
      this.activeGroup = '全部';
    },
    getPage(page) {
      if (page !== this.paginationConfig.currentPage) {
        this.paginationConfig.currentPage = page;
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    },
  },
});
