import { useState } from "react";
import "./App.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ThemeSwitch } from "./components/ThemeSwitch/ThemeSwitch";
import { AuthProvider } from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";
import LoginMain from "./pages/Login/LoginMain";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
function App() {
    const [modeColor, setModeColor] = useState("light");
    const theme = createTheme({
        palette: {
            mode: modeColor,
            primary: {
                main: modeColor === "light" ? "#753939" : "#C6E3F5",
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
                </Routes>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
