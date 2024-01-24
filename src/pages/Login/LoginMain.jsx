import { useState } from "react";
import "./LoginMain.css";
import LoginNav from "./LoginNav";
import Login from "./Login";
import Register from "./Register";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { Typography } from "@mui/material";

export default function LoginMain() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <main className="login-register-container Page">
            <LoginNav isLogin={isLogin} setIsLogin={setIsLogin} />
            {isLogin ? <Login /> : <Register />}

            <div
                className="logo"
                style={{
                    maxWidth: "400px",
                    width: 1,
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                }}
            >
                <img src="/lightLogonobg.png" alt="Barter Nest" />
                {/* <Typography variant="h3" color="primary">
                    B
                </Typography>
                <SwapHorizIcon
                    color="primary"
                    sx={{ width: "100px", height: "100px" }}
                />
                <Typography variant="h3" color="primary">
                    N
                </Typography> */}
            </div>
            {/* {palette.mode === "dark" ? (
                <img src={darkLogo} alt="app logo" />
            ) : (
                <img src={lightLogo} alt="app logo" />
            )} */}
        </main>
    );
}
