import axios from 'axios';
import { API_CONFIG } from '../constants';

// Create axios instances with better configuration
const createApiInstance = (endpoint) => {
    const instance = axios.create({
        baseURL: API_CONFIG.BASE_URL + endpoint,
        timeout: API_CONFIG.TIMEOUT,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Request interceptor to add auth token
    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor for error handling
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                // Handle unauthorized access
                localStorage.removeItem('token');
                window.location.href = '/auth/login';
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

// Export API instances
export const api = {
    users: createApiInstance(API_CONFIG.ENDPOINTS.USERS),
    products: createApiInstance(API_CONFIG.ENDPOINTS.PRODUCTS),
    offers: createApiInstance(API_CONFIG.ENDPOINTS.OFFERS),
    reviews: createApiInstance(API_CONFIG.ENDPOINTS.REVIEWS),
};

// Legacy exports for backward compatibility
export const axiosUsersInstance = api.users;
export const axiosProductsInstance = api.products;
export const axiosOffersInstance = api.offers;
export const axiosReviewsInstance = api.reviews; 