import { useState } from "react";
import "./App.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ThemeSwitch } from "./components/ThemeSwitch/ThemeSwitch";
import { AuthProvider } from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";
import LoginMain from "./pages/Login/LoginMain";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar";
import MyProducts from "./pages/MyProducts/MyProducts";
function App() {
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
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ThemeSwitch theme={theme} onChange={handleChange} />
            <AuthProvider>
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
                                <BottomNavbar />
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                <Profile />
                                <BottomNavbar />
                            </>
                        }
                    />
                    <Route
                        path="/myProducts"
                        element={
                            <>
                                <MyProducts />
                                <BottomNavbar />
                            </>
                        }
                    />
                </Routes>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
