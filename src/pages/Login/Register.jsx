import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoginUsingSocialMedia from "./LoginUsingSocialMedia";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import BasicModal from "../../components/BasicModal/BasicModal";
import CircularIndeterminate from "../../components/CircularIndeterminate/CircularIndeterminate";

function passwordConfirmation(mainPass, confirmPass, setRegisterError) {
    if (mainPass !== confirmPass) {
        setRegisterError("Passwords do not match");
        return false;
    }
    setRegisterError("");
    return true;
}

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const emailInput = useRef();
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();
    const displayNameRef = useRef();
    const idRef = useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [registerError, setRegisterError] = useState(null);
    const { register } = useAuth();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading((prev) => !prev);
        if (
            passwordConfirmation(
                passwordInput.current.value,
                confirmPasswordInput.current.value,
                setRegisterError
            )
        ) {
            const userInfo = {
                displayName: displayNameRef.current.value,
                email: emailInput.current.value,
                password: passwordInput.current.value,
            };
            const result = await register(userInfo);
            setTimeout(() => {
                if (result.status !== 201) {
                    setRegisterError(result.response.data);
                } else {
                    navigate("/dashboard");
                }
            }, 1000);
        }
        setLoading((prev) => !prev);
    };

    return (
        <div className="login-form-container">
            <Typography color="primary" variant="h4">
                Create Account
            </Typography>
            <form id="login-form" onSubmit={handleRegisterSubmit}>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">
                        Email
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-email"
                        label="Email"
                        inputRef={emailInput}
                        type="email"
                        size="large"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                        Password
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-password"
                        label="Password"
                        size="large"
                        inputRef={passwordInput}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-confirm-password">
                        Confirm Password
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-confirm-password"
                        label="Confirm Password"
                        size="large"
                        inputRef={confirmPasswordInput}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-display-name">
                        Display Name
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-display-name"
                        label="Display Name"
                        inputRef={displayNameRef}
                        type="text"
                        size="large"
                    />
                </FormControl>

                {/* <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-id">ID</InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-id"
                        label="ID"
                        inputRef={idRef}
                        type="text"
                        size="large"
                    />
                </FormControl> */}
                {loading ? (
                    <CircularIndeterminate />
                ) : (
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                    >
                        Register
                    </Button>
                )}
                <LoginUsingSocialMedia />
            </form>
            {registerError && (
                <BasicModal msg={registerError} setMsg={setRegisterError} />
            )}
        </div>
    );
}
