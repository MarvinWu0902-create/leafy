import axios from "axios"
const { VITE_URL, VITE_PATH } = import.meta.env

export const apiadmingetOrder = (page) => axios.get(`${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${page}`)
export const apiadminadjustOrder = (order) => axios.put(`${VITE_URL}/api/${VITE_PATH}/admin/order/${order.id}`, {
    data: order
})
export const apiadmindeleteOrder=(id)=>axios.delete(`${VITE_URL}/api/${VITE_PATH}/admin/order/${id}`)
