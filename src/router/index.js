import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '首頁',
      component: () => import('../views/front/IndexView.vue'),
      children: [
        {
          path: '',
          name: '首頁',
          component: () => import('../views/front/HomeView.vue'),
        },
        {
          path: 'about',
          name: '關於我們',
          component: () => import('../views/front/AboutView.vue'),
        },
        {
          path: 'service',
          name: '常見問題',
          component: () => import('../views/front/ServiceView.vue'),
        },
        {
          path: 'productlist',
          name: '商品列表',
          component: () => import('../views/front/ProductListView.vue'),
        },
        {
          path: 'product/:id',
          name: '商品頁面',
          component: () => import('../views/front/ProductView.vue'),
        },
        {
          path: 'ordercheck',
          name: '訂單確認',
          component: () => import('../views/front/OrderCheckView.vue'),
        },
        {
          path: 'ordercreate/:id',
          name: '建立訂單',
          component: () => import('../views/front/OrderCreateView.vue'),
        },
        {
          path: 'userinfo',
          name: '用戶資訊',
          component: () => import('../views/front/UserInfoView.vue'),
        }
      ]
    },
    {
      path: '/dashboard',
      name: '後台管理',
      component: () => import('../views/dashboard/IndexView.vue'),
      children: [
        {
          path: '',
          name: '商品表單',
          component: () => import('../views/dashboard/ProductView.vue'),
        },
        {
          path: 'order',
          name: '訂單管理',
          component: () => import('../views/dashboard/OrderView.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: '登入',
      component: () => import('../views/dashboard/LoginView.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
})

export default router
