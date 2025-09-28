import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { accessToken } = useAuth();

    const apiCall = useCallback(async (apiFunction, ...args) => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await apiFunction(...args);
            return result;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        loading,
        error,
        apiCall,
        clearError,
    };
};

export const useApiWithAuth = () => {
    const { loading, error, apiCall, clearError } = useApi();
    const { accessToken } = useAuth();

    const authApiCall = useCallback(async (apiFunction, ...args) => {
        if (!accessToken) {
            throw new Error('No access token available');
        }
        
        return apiCall(apiFunction, ...args);
    }, [apiCall, accessToken]);

    return {
        loading,
        error,
        apiCall: authApiCall,
        clearError,
    };
}; 