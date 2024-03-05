import axios from "axios"
const { VITE_URL } = import.meta.env

export const apiLogin = (username, password) => axios.post(`${VITE_URL}/admin/signin`, {
    username,
    password
});
export const apiloginCheck = () => axios.post(`${VITE_URL}/api/user/check`,null);
export const apiLogout = () => axios.post(`${VITE_URL}/logout`);