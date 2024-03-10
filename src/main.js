import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { register } from 'swiper/element/bundle';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import { defineRule, configure } from 'vee-validate';
import * as rules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Swal from 'sweetalert2';
import zhTW from '@/zh_TW.json';

import './assets/main.scss';
import './style.css';
import 'swiper/scss';
import 'swiper/css/bundle';

import App from './App.vue';
import router from './router';

Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule]);
});

// Activate the locale
configure({
  generateMessage: localize({ zhTW }),
  validateOnInput: false,
});
setLocale('zhTW');

library.add(faSpinner);

const app = createApp(App);

app.config.globalProperties.$swal = Swal;

router.beforeEach((to, from, next) => {
  app.config.globalProperties.$previousRoute = from;
  next();
});

app.component('VueLoading', Loading);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia());
app.use(register);
app.use(router);
app.mount('#app');
