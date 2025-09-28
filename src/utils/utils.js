import axios from "axios";

const BASE_URL = import.meta.env.VITE_ENV == 'PROD' ? import.meta.env.VITE_PROD_URL : import.meta.env.VITE_DEV_URL; 
const URL = BASE_URL + "/api/v1/exchange/";
export const axiosUsersInstance = axios.create({
    baseURL: URL + "users/",
    timeout: 5000, // Set a timeout for requests (optional)
    headers: {
        "Content-Type": "application/json",
        // Add any other headers you need
    },
});

export const axiosProductsInstance = axios.create({
    baseURL: URL + "products/",
    timeout: 5000, // Set a timeout for requests (optional)
    headers: {
        "Content-Type": "application/json",
        // Add any other headers you need
    },
});
export const axiosOffersInstance = axios.create({
    baseURL: URL + "offers/",
    timeout: 5000, // Set a timeout for requests (optional)
    headers: {
        "Content-Type": "application/json",
        // Add any other headers you need
    },
});
export const axiosReviewsInstance = axios.create({
    baseURL: URL + "reviews/",
    timeout: 5000, // Set a timeout for requests (optional)
    headers: {
        "Content-Type": "application/json",
        // Add any other headers you need
    },
});
