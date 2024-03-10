import axios from 'axios';

const { VITE_URL, VITE_PATH } = import.meta.env;

export const apigetCart = () => axios.get(`${VITE_URL}/api/${VITE_PATH}/cart`);
export const apipostCart = (product_id, qty = 1) => axios.post(`${VITE_URL}/api/${VITE_PATH}/cart`, {
  data: {
    product_id,
    qty,
  },
});
export const apideleteCart = (cartId) => axios.delete(`${VITE_URL}/api/${VITE_PATH}/cart/${cartId}`);
export const apideleteCarts = () => axios.delete(`${VITE_URL}/api/${VITE_PATH}/carts`);
export const apiadjustCart = (cartId, product_id, qty = 1) => axios.put(`${VITE_URL}/api/${VITE_PATH}/cart/${cartId}`, {
  data: {
    product_id,
    qty,
  },
});
