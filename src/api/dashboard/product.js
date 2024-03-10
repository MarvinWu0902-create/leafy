import axios from 'axios';

const { VITE_URL, VITE_PATH } = import.meta.env;

export const apiadmingetProduct = (category, page = 1) => axios.get(`${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}${category !== 'all' ? `&category=${category}` : ''}`);
export const apiadminadjustProduct = (product) => axios.put(`${VITE_URL}/api/${VITE_PATH}/admin/product/${product.id}`, {
  data: {
    title: product.title,
    category: product.category,
    origin_price: product.origin_price,
    price: product.price,
    unit: product.unit,
    description: product.description,
    content: product.content,
    is_enabled: product.is_enabled,
    imageUrl: product.imageUrl,
    imagesUrl: product.imagesUrl,
  },
});
export const apiadminpostProduct = (product) => axios.post(`${VITE_URL}/api/${VITE_PATH}/admin/product`, {
  data: product,
});
export const apiadmindeleteProduct = (id) => axios.delete(`${VITE_URL}/api/${VITE_PATH}/admin/product/${id}`);
