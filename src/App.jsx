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
function App() {
    const location = useLocation();
    const [modeColor, setModeColor] = useState("light");
    const theme = createTheme({
        palette: {
            mode: modeColor,
            primary: {
                main: modeColor === "light" ? "#005f8b" : "#753939",
            },
            secondary: {
                main: modeColor === "light" ? "#CAA7A7" : "#757439",
            },
        },
    });
    const handleChange = () => {
        setModeColor((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    const [showNavbar, setShowNavbar] = useState(false);
    console.log(location.pathname.includes("login"));
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
                </Routes>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
