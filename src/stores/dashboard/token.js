import { defineStore } from 'pinia';
import axios from 'axios';

export default defineStore('token', {
  actions: {
    setHeaderToken() {
      const token = document.cookie.split('; ')
        .find((row) => row.startsWith('MyToken='))
        ?.split('=')[1];
      axios.defaults.headers.common.Authorization = token;
    },
  },
});
