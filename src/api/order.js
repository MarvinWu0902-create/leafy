import axios from 'axios';

const { VITE_URL, VITE_PATH } = import.meta.env;
export const apipostOrder = (user, message) => axios.post(`${VITE_URL}/api/${VITE_PATH}/order`, { data: { user, message } });
export const apigetAllOrder = () => axios.get(`${VITE_URL}/api/${VITE_PATH}/orders`);
export const apigetSingleOrder = (id) => axios.get(`${VITE_URL}/api/${VITE_PATH}/order/${id}`);
export const apipayOrder = (id) => axios.post(`${VITE_URL}/api/${VITE_PATH}/pay/${id}`);
