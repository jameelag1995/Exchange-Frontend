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
import Product from "./pages/Product/Product";
import Offer from "./pages/Offer/Offer";
import MyOffers from "./pages/MyOffers/MyOffers";
import Reviews from "./pages/Reviews/Reviews";
import MiniDrawer from "./components/SideBar/SideBar";
import Welcome from "./pages/Welcome/Welcome";
import About from "./pages/About/About";
function App() {
    const location = useLocation();
    const [modeColor, setModeColor] = useState("light");

    const commonColors = {
        primary: {
            main: modeColor === "light" ? "#753939" : "#C6E3F5",
        },
        secondary: {
            main: "#757439",
        },
        info: {
            main: "#395E75",
        },
        error: {
            main: "#f44336",
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
        // typography: {
        //     fontFamily: "Roboto Mono",
        // },
    });
    const handleChange = () => {
        setModeColor((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    const [showNavbar, setShowNavbar] = useState(false);
    useEffect(() => {
        console.log(location.pathname);
        if (
            location.pathname.includes("login") ||
            location.pathname.includes("auth") ||
            location.pathname === "/" ||
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
            {/* <ThemeSwitch theme={theme} onChange={handleChange} /> */}

            <AuthProvider>
                {showNavbar && (
                    <>
                        <MiniDrawer />
                        <BottomNavbar />
                    </>
                )}

                <Routes>
                    <Route exact path="/" element={<Welcome />} />
                    <Route path="/auth" element={<LoginMain />}>
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/register" element={<Register />} />
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
                                <Profile
                                    modeColor={modeColor}
                                    setModeColor={setModeColor}
                                />
                            </>
                        }
                    />
                    <Route
                        path="/my-products"
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
                    <Route
                        path="/my-offers"
                        element={
                            <>
                                <MyOffers />
                            </>
                        }
                    />
                    <Route
                        path="/reviews/:userId"
                        element={
                            <>
                                <Reviews />
                            </>
                        }
                    />
                    <Route
                        path="/about"
                        element={
                            <>
                                <About />
                            </>
                        }
                    />
                </Routes>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
