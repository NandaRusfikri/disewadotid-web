import axios from 'axios';
import {getAuthorizationHeader} from "/src/utils/getAuthorizationHeader";

const axiosInstance = axios.create({
    baseURL: process.env.apidomain, // Set your base URL here
});

axiosInstance.interceptors.request.use(config => {
    // Modify the config object to include your authorization header
    const header = getAuthorizationHeader();
    config.headers = {
        ...config.headers,
        ...header
    };
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;
