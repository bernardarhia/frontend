import axios from "axios"

const BASE_URL ="http://localhost:7000/api"
export default axios.create({
    baseURL:BASE_URL
})
export const axiosPrivate = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})