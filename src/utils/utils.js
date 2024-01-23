import axios from "axios";

export const axiosUsersInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1/exchange/users/",
    timeout: 5000, // Set a timeout for requests (optional)
    headers: {
        "Content-Type": "application/json",
        // Add any other headers you need
    },
});

export const axiosProductsInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1/exchange/products/",
    timeout: 5000, // Set a timeout for requests (optional)
    headers: {
        "Content-Type": "application/json",
        // Add any other headers you need
    },
});
export const axiosOffersInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1/exchange/offers/",
    timeout: 5000, // Set a timeout for requests (optional)
    headers: {
        "Content-Type": "application/json",
        // Add any other headers you need
    },
});
export const axiosReviewsInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1/exchange/reviews/",
    timeout: 5000, // Set a timeout for requests (optional)
    headers: {
        "Content-Type": "application/json",
        // Add any other headers you need
    },
});
