// API Configuration
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_NODE_ENV == 'PROD' ? import.meta.env.VITE_PROD_URL : import.meta.env.VITE_DEV_URL,
    ENDPOINTS: {
        USERS: '/api/users',
        PRODUCTS: '/api/products',
        OFFERS: '/api/offers',
        REVIEWS: '/api/reviews',
    },
    TIMEOUT: 10000,
};

// Local Storage Keys
export const STORAGE_KEYS = {
    THEME: 'barterNest_theme',
    AUTH_TOKEN: 'barterNest_auth_token',
    USER_PREFERENCES: 'barterNest_user_preferences',
};

// Theme Configuration
export const THEME_CONFIG = {
    LIGHT: {
        primary: { 
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#ffffff'
        },
        secondary: { 
            main: '#dc004e',
            light: '#ff5983',
            dark: '#9a0036',
            contrastText: '#ffffff'
        },
        info: { 
            main: '#0288d1',
            light: '#03a9f4',
            dark: '#01579b',
            contrastText: '#ffffff'
        },
        error: { main: '#d32f2f' },
        warning: { main: '#ed6c02' },
        success: { main: '#2e7d32' },
        background: { 
            default: '#fafafa',
            paper: '#ffffff',
            main: '#e3f2fd'
        },
        text: {
            primary: '#212121',
            secondary: '#757575',
            disabled: '#9e9e9e'
        },
        divider: 'rgba(0, 0, 0, 0.12)',
        action: {
            hover: 'rgba(25, 118, 210, 0.08)',
            selected: 'rgba(25, 118, 210, 0.12)',
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)',
        }
    },
    DARK: {
        primary: { 
            main: '#90caf9',
            light: '#e3f2fd',
            dark: '#42a5f5',
            contrastText: '#000000'
        },
        secondary: { 
            main: '#f48fb1',
            light: '#f8bbd9',
            dark: '#ec407a',
            contrastText: '#000000'
        },
        info: { 
            main: '#81d4fa',
            light: '#b3e5fc',
            dark: '#4fc3f7',
            contrastText: '#000000'
        },
        error: { main: '#f44336' },
        warning: { main: '#ff9800' },
        success: { main: '#4caf50' },
        background: { 
            default: '#121212',
            paper: '#1e1e1e',
            main: '#121212'
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
            disabled: '#666666'
        },
        divider: 'rgba(255, 255, 255, 0.12)',
        action: {
            hover: 'rgba(144, 202, 249, 0.08)',
            selected: 'rgba(144, 202, 249, 0.12)',
            disabled: 'rgba(255, 255, 255, 0.3)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
        }
    },
    TYPOGRAPHY: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
            lineHeight: 1.4,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
            lineHeight: 1.4,
        },
        h6: {
            fontSize: '1.125rem',
            fontWeight: 500,
            lineHeight: 1.4,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
            letterSpacing: '0.01em',
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
            letterSpacing: '0.01em',
        },
        button: {
            fontSize: '0.875rem',
            fontWeight: 600,
            textTransform: 'none',
            letterSpacing: '0.02em',
        },
        caption: {
            fontSize: '0.75rem',
            lineHeight: 1.4,
            letterSpacing: '0.02em',
        },
    },
    SHADOWS: {
        light: '0 2px 8px rgba(0, 0, 0, 0.1)',
        medium: '0 4px 20px rgba(0, 0, 0, 0.15)',
        heavy: '0 8px 30px rgba(0, 0, 0, 0.2)',
        card: '0 4px 20px rgba(0, 0, 0, 0.1)',
        modal: '0 20px 40px rgba(0, 0, 0, 0.25)',
    },
    BORDER_RADIUS: {
        small: 4,
        medium: 8,
        large: 12,
        xlarge: 16,
    },
    SPACING: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    }
};

// Routes Configuration
export const ROUTES = {
    HOME: '/',
    AUTH: {
        MAIN: '/auth',
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
    },
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    MY_PRODUCTS: '/my-products',
    PRODUCT: '/products/:productId',
    OFFER: '/offer/:offerId',
    MY_OFFERS: '/my-offers',
    REVIEWS: '/reviews/:userId',
    ABOUT: '/about',
};

// Navigation Configuration
export const NAV_ITEMS = [
    { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: 'Dashboard' },
    { path: ROUTES.MY_PRODUCTS, label: 'My Products', icon: 'Inventory' },
    { path: ROUTES.MY_OFFERS, label: 'My Offers', icon: 'ReceiptLong' },
    { path: ROUTES.PROFILE, label: 'Profile', icon: 'AccountCircle' },
];

// Product Categories
export const PRODUCT_CATEGORIES = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports & Outdoors',
    'Toys & Games',
    'Automotive',
    'Health & Beauty',
    'Jewelry',
    'Art & Collectibles',
    'Other'
];

// Product Subcategories
export const PRODUCT_SUBCATEGORIES = {
    Electronics: ['Smartphones', 'Laptops', 'Tablets', 'Cameras', 'Audio', 'Gaming', 'Other'],
    Clothing: ['Men', 'Women', 'Kids', 'Shoes', 'Accessories', 'Other'],
    Books: ['Fiction', 'Non-Fiction', 'Textbooks', 'Children', 'Other'],
    'Home & Garden': ['Furniture', 'Kitchen', 'Decor', 'Tools', 'Garden', 'Other'],
    'Sports & Outdoors': ['Fitness', 'Camping', 'Cycling', 'Water Sports', 'Other'],
    'Toys & Games': ['Board Games', 'Video Games', 'Educational', 'Outdoor', 'Other'],
    Automotive: ['Cars', 'Motorcycles', 'Parts', 'Accessories', 'Other'],
    'Health & Beauty': ['Skincare', 'Makeup', 'Haircare', 'Fragrances', 'Other'],
    Jewelry: ['Necklaces', 'Rings', 'Earrings', 'Watches', 'Other'],
    'Art & Collectibles': ['Paintings', 'Sculptures', 'Antiques', 'Coins', 'Other'],
    Other: ['Miscellaneous']
};

// Form Validation Rules
export const VALIDATION_RULES = {
    EMAIL: {
        required: 'Email is required',
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
        }
    },
    PASSWORD: {
        required: 'Password is required',
        minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
        }
    },
    DISPLAY_NAME: {
        required: 'Display name is required',
        minLength: {
            value: 2,
            message: 'Display name must be at least 2 characters'
        },
        maxLength: {
            value: 50,
            message: 'Display name must be less than 50 characters'
        }
    },
    PRODUCT_TITLE: {
        required: 'Product title is required',
        minLength: {
            value: 3,
            message: 'Product title must be at least 3 characters'
        },
        maxLength: {
            value: 100,
            message: 'Product title must be less than 100 characters'
        }
    },
    PRODUCT_DESCRIPTION: {
        required: 'Product description is required',
        minLength: {
            value: 10,
            message: 'Product description must be at least 10 characters'
        },
        maxLength: {
            value: 500,
            message: 'Product description must be less than 500 characters'
        }
    }
};

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access denied. You do not have permission to view this resource.',
    NOT_FOUND: 'The requested resource was not found.',
    SERVER_ERROR: 'Server error. Please try again later.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
    LOGIN: 'Successfully logged in!',
    REGISTER: 'Account created successfully!',
    LOGOUT: 'Successfully logged out!',
    PRODUCT_CREATED: 'Product created successfully!',
    PRODUCT_UPDATED: 'Product updated successfully!',
    PRODUCT_DELETED: 'Product deleted successfully!',
    OFFER_SENT: 'Offer sent successfully!',
    OFFER_UPDATED: 'Offer updated successfully!',
    REVIEW_SUBMITTED: 'Review submitted successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
};

// Animation Durations
export const ANIMATIONS = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    MODAL: 800,
};

// Breakpoints
export const BREAKPOINTS = {
    MOBILE: 600,
    TABLET: 900,
    DESKTOP: 1200,
    LARGE_DESKTOP: 1600,
}; 