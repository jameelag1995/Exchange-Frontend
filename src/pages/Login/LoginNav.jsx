import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function LoginNav({ isLogin, setIsLogin }) {
    const navigate = useNavigate();
    return (
        <div className="top-buttons-container">
            <div className="login-register-btn">
                <Button
                    variant={isLogin ? "contained" : "outlined"}
                    onClick={() => {
                        navigate("/login");
                        setIsLogin(true);
                    }}
                >
                    Log In
                </Button>
                <Button
                    variant={!isLogin ? "contained" : "outlined"}
                    onClick={() => {
                        navigate("/register");
                        setIsLogin(false);
                    }}
                >
                    Register
                </Button>
            </div>
        </div>
    );
}
