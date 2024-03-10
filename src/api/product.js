import axios from 'axios';

const { VITE_URL, VITE_PATH } = import.meta.env;

export const apigetProduct = () => axios.get(`${VITE_URL}/api/${VITE_PATH}/products/all`);
export const apigetsingleProduct = (id) => axios.get(`${VITE_URL}/api/${VITE_PATH}/product/${id}`);
export const apigetRelatedProduct = (category) => axios.get(`${VITE_URL}/api/${VITE_PATH}/products?category=${category}`);
