import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
        
        // Log error to console in development
        if (import.meta.env.NODE_ENV) {
            console.error('Error caught by boundary:', error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            return <ErrorFallback onReset={() => this.setState({ hasError: false })} />;
        }

        return this.props.children;
    }
}

const ErrorFallback = ({ onReset }) => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate(ROUTES.HOME);
        onReset();
    };

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                p: 3,
            }}
        >
            <Paper
                sx={{
                    p: 4,
                    textAlign: 'center',
                    maxWidth: 500,
                }}
            >
                <Typography variant="h4" gutterBottom color="error">
                    Oops! Something went wrong
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    We're sorry, but something unexpected happened. Please try again.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button variant="contained" onClick={handleGoHome}>
                        Go Home
                    </Button>
                    <Button variant="outlined" onClick={handleReload}>
                        Reload Page
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ErrorBoundary; 