import { useEffect, useRef, useState } from "react";
import { axiosUsersInstance } from "../../utils/utils";
import {
    Avatar,
    Button,
    Divider,
    FormControl,
    InputLabel,
    OutlinedInput,
    Slide,
    Typography,
    Box,
    Container,
    Paper,
    useTheme,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Profile.css";
import { useAuth } from "../../context/AuthContext";
import { useTheme as useCustomTheme } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import BasicModal from "../../components/BasicModal/BasicModal";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Profile() {
    const navigate = useNavigate();
    const theme = useTheme();
    const { mode, toggleTheme } = useCustomTheme();
    const { accessToken, logout, logoutAll } = useAuth();
    const [userDetails, setUserDetails] = useState(null);
    const [msg, setMsg] = useState(null);
    const [editing, setEditing] = useState(false);
    const displayNameRef = useRef();
    const [images, setImages] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleLogout = async () => {
        await logout();
    };

    const handleLogoutAll = async () => {
        await logoutAll();
    };

    const updateProfilePicture = async () => {
        try {
            const newProfilePic = images[images.length - 1];
            if (newProfilePic) {
                const result = await axiosUsersInstance.patch(
                    "/update",
                    {
                        profilePicture: newProfilePic,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    }
                );
                if (result.status === 200) {
                    await fetchUserData();
                    setIsUpdating(false);
                    setMsg({
                        title: "Success",
                        message: "Profile Picture Updated.",
                    });
                }
            }
        } catch (error) {
            setMsg(error.response.data);
        }
    };

    const handleDisplayNameChange = async () => {
        if (displayNameRef.current.value.length >= 2) {
            try {
                const result = await axiosUsersInstance.patch(
                    "/update",
                    {
                        displayName: displayNameRef.current.value,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    }
                );
                if (result.status === 200) {
                    await fetchUserData();
                    setEditing(false);
                }
            } catch (error) {
                setMsg(error.response.data);
            }
        } else {
            setMsg({
                title: "Display Name Change Error",
                message: "Display Name must be at least 2 characters.",
            });
        }
    };

    const fetchUserData = async () => {
        try {
            const result = await axiosUsersInstance.get("/me", {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });

            setUserDetails(result.data);
        } catch (error) {
            setMsg(error.response.data);
        }
    };

    useEffect(() => {
        if (!accessToken) {
            navigate("/auth/login");
        }
        if (accessToken) fetchUserData();
    }, [accessToken]);

    return (
        <Slide direction="up" in style={{ transitionDelay: 800 }}>
            <Container maxWidth="md" sx={{ py: 4, mt: 8, mb: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* User Info Section */}
                    <Paper 
                        elevation={0}
                        sx={{ 
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 3,
                            background: theme.palette.mode === 'dark' 
                                ? 'rgba(255, 255, 255, 0.05)' 
                                : 'rgba(25, 118, 210, 0.05)',
                            border: `1px solid ${theme.palette.mode === 'dark' 
                                ? 'rgba(255, 255, 255, 0.1)' 
                                : 'rgba(25, 118, 210, 0.1)'}`,
                            borderRadius: 3
                        }}
                    >
                        <Avatar
                            src={userDetails?.profilePicture}
                            sx={{
                                width: 120,
                                height: 120,
                                boxShadow: theme.shadows[4],
                                border: `3px solid ${theme.palette.primary.main}`,
                            }}
                        />
                        
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography 
                                variant="h4" 
                                sx={{ 
                                    fontWeight: 600,
                                    color: theme.palette.text.primary,
                                    mb: 1
                                }}
                            >
                                {userDetails?.displayName}
                            </Typography>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    color: theme.palette.text.secondary,
                                    mb: 2
                                }}
                            >
                                {userDetails?.email}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Button
                                variant={editing ? "contained" : "outlined"}
                                onClick={() => setEditing((prev) => !prev)}
                                sx={{ minWidth: 120 }}
                            >
                                Edit Profile
                            </Button>
                            
                            <Box 
                                sx={{ 
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    p: 1.5,
                                    borderRadius: 2,
                                    backgroundColor: theme.palette.mode === 'dark' 
                                        ? 'rgba(255, 255, 255, 0.1)' 
                                        : 'rgba(0, 0, 0, 0.05)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: theme.palette.mode === 'dark' 
                                            ? 'rgba(255, 255, 255, 0.2)' 
                                            : 'rgba(0, 0, 0, 0.1)',
                                        transform: 'scale(1.05)',
                                    }
                                }}
                                onClick={toggleTheme}
                            >
                                {mode === 'light' ? (
                                    <>
                                        <DarkModeIcon sx={{ color: theme.palette.primary.main }} />
                                        <Typography sx={{ color: theme.palette.text.primary }}>
                                            Dark Mode
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <LightModeIcon sx={{ color: theme.palette.primary.main }} />
                                        <Typography sx={{ color: theme.palette.text.primary }}>
                                            Light Mode
                                        </Typography>
                                    </>
                                )}
                            </Box>
                        </Box>

                        {editing && (
                            <Box sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: 2, 
                                width: '100%', 
                                maxWidth: 400 
                            }}>
                                <FormControl variant="outlined" fullWidth>
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
                                <Button
                                    variant="contained"
                                    onClick={handleDisplayNameChange}
                                    sx={{ minWidth: 120 }}
                                >
                                    Update Name
                                </Button>
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                            <div
                                className="upload-container"
                                onClick={() => setIsUpdating(true)}
                            >
                                <UploadWidget images={images} setImages={setImages} />
                            </div>
                            {isUpdating && (
                                <Button
                                    variant="outlined"
                                    onClick={updateProfilePicture}
                                    sx={{ minWidth: 120 }}
                                >
                                    Update Picture
                                </Button>
                            )}
                        </Box>
                    </Paper>

                    {/* User Actions Section */}
                    <Paper 
                        elevation={0}
                        sx={{ 
                            p: 3,
                            background: theme.palette.mode === 'dark' 
                                ? 'rgba(255, 255, 255, 0.05)' 
                                : 'rgba(0, 0, 0, 0.02)',
                            border: `1px solid ${theme.palette.mode === 'dark' 
                                ? 'rgba(255, 255, 255, 0.1)' 
                                : 'rgba(0, 0, 0, 0.08)'}`,
                            borderRadius: 3
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link to="/about" style={{ textDecoration: 'none' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: theme.palette.mode === 'dark' 
                                                ? 'rgba(255, 255, 255, 0.1)' 
                                                : 'rgba(0, 0, 0, 0.05)',
                                        }
                                    }}
                                >
                                    <InfoIcon sx={{ color: theme.palette.primary.main }} />
                                    <Typography sx={{ color: theme.palette.text.primary }}>
                                        About
                                    </Typography>
                                </Box>
                            </Link>

                            <Divider sx={{ my: 1 }} />

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 2,
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    color: theme.palette.error.main,
                                    '&:hover': {
                                        backgroundColor: theme.palette.mode === 'dark' 
                                            ? 'rgba(244, 67, 54, 0.1)' 
                                            : 'rgba(244, 67, 54, 0.05)',
                                    }
                                }}
                                onClick={handleLogout}
                            >
                                <LogoutIcon sx={{ color: theme.palette.error.main }} />
                                <Typography sx={{ color: theme.palette.error.main }}>
                                    Logout
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 1 }} />

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 2,
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    color: theme.palette.error.main,
                                    '&:hover': {
                                        backgroundColor: theme.palette.mode === 'dark' 
                                            ? 'rgba(244, 67, 54, 0.1)' 
                                            : 'rgba(244, 67, 54, 0.05)',
                                    }
                                }}
                                onClick={handleLogoutAll}
                            >
                                <LogoutIcon sx={{ color: theme.palette.error.main }} />
                                <Typography sx={{ color: theme.palette.error.main }}>
                                    Logout From All Devices
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
                
                {msg && <BasicModal msg={msg} setMsg={setMsg} />}
            </Container>
        </Slide>
    );
}
