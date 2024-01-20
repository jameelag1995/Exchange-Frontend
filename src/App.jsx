import { useEffect, useState } from "react";
import "./App.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ThemeSwitch } from "./components/ThemeSwitch/ThemeSwitch";
import { AuthProvider } from "./context/AuthContext";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginMain from "./pages/Login/LoginMain";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar";
import MyProducts from "./pages/MyProducts/MyProducts";
import { Cloudinary } from "@cloudinary/url-gen";
import Product from "./pages/Product/Product";
import Offer from "./pages/Offer/Offer";
function App() {
    const location = useLocation();
    const [modeColor, setModeColor] = useState("light");

    const commonColors = {
        primary: {
            main: "#753939",
        },
        secondary: {
            main: "#757439",
        },
        info: {
            main: "#395E75",
        },
        error: {
            main: "#CAA7A7",
        },
        background: {
            main: "#C6E3F5",
        },
    };

    const theme = createTheme({
        palette: {
            mode: modeColor,
            ...commonColors,
        },
        typography: {
            fontFamily: "Roboto, sans-serif",
        },
    });
    const handleChange = () => {
        setModeColor((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    const [showNavbar, setShowNavbar] = useState(false);
    useEffect(() => {
        if (
            location.pathname.includes("login") ||
            location.pathname.includes("register")
        ) {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
        }
    }, [location.pathname]);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ThemeSwitch theme={theme} onChange={handleChange} />

            <AuthProvider>
                {showNavbar && <BottomNavbar />}
                <Routes>
                    <Route exact path="/" element={<LoginMain />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route
                        path="/dashboard"
                        element={
                            <>
                                <Dashboard />
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                <Profile />
                            </>
                        }
                    />
                    <Route
                        path="/myProducts"
                        element={
                            <>
                                <MyProducts />
                            </>
                        }
                    />
                    <Route
                        path="/products/:productId"
                        element={
                            <>
                                <Product />
                            </>
                        }
                    />
                    <Route
                        path="/offer/:offerId"
                        element={
                            <>
                                <Offer />
                            </>
                        }
                    />
                </Routes>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
