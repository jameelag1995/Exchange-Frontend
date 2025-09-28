import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Layout } from "./components/Layout/Layout";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <CssBaseline />
                <AuthProvider>
                    <Layout>
                        <AppRoutes />
                    </Layout>
                </AuthProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}

export default App;
