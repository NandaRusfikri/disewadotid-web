import axios from 'axios';

// Create an instance of Axios with a custom configuration
const axiosInstance = axios.create({
    baseURL: process.env.apidomain, // Set your base URL here
});

// Add an authorization header to all requests
axiosInstance.interceptors.request.use(config => {
    // Modify the config object to include your authorization header
    // config.headers.Authorization =`Bearer ea`; // Set your authorization header value here
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;
