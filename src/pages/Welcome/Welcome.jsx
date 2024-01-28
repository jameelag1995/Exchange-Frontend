import { Button, Slide, Typography } from "@mui/material";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const navigate = useNavigate();
    return (
        <Slide direction="up" in>
            <div className="Welcome Page">
                <img src="/lightLogonobg.png" alt="BarterNest" />

                <Typography
                    variant="h4"
                    fontFamily="caveat"
                    sx={{ textAlign: "center", color: "#bd8959" }}
                >
                    Where you save our planet, and we save your money.
                </Typography>

                <Button
                    onClick={() => navigate("/auth/login")}
                    variant="contained"
                    sx={{ mt: "40px" }}
                >{`Let's Get Started`}</Button>
            </div>
        </Slide>
    );
}
