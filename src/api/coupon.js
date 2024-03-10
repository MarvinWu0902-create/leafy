import axios from 'axios';

const { VITE_URL, VITE_PATH } = import.meta.env;
export const apipostCoupon = (code) => axios.post(`${VITE_URL}/api/${VITE_PATH}/coupon`, { data: { code } });
