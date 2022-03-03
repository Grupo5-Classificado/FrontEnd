import axios from 'axios'

const api = axios.create({
    //baseURL: 'http://192.168.3.159:5000/api',
    baseURL: 'https://621fe5dace99a7de194b643f.mockapi.io',
});

export default api;