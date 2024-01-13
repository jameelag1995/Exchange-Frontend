import { useState } from "react";
import "./LoginMain.css";
import LoginNav from "./LoginNav";
import Login from "./Login";
import Register from "./Register";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";

export default function LoginMain() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <main className="login-register-container Page">
            <LoginNav isLogin={isLogin} setIsLogin={setIsLogin} />
            {isLogin ? <Login /> : <Register />}

            <SwapHorizontalCircleIcon
                color="primary"
                sx={{ width: "200px", height: "200px" }}
            />
            {/* {palette.mode === "dark" ? (
                <img src={darkLogo} alt="app logo" />
            ) : (
                <img src={lightLogo} alt="app logo" />
            )} */}
        </main>
    );
}
