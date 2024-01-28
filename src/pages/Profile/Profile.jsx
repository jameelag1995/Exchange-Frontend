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
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import ShieldIcon from "@mui/icons-material/Shield";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Profile.css";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import BasicModal from "../../components/BasicModal/BasicModal";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { light } from "@mui/material/styles/createPalette";
export default function Profile({ modeColor, setModeColor }) {
    const navigate = useNavigate();
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
            <div className="Profile Page">
                <div className="user-info">
                    <Avatar
                        src={userDetails?.profilePicture}
                        sx={{
                            width: "100px",
                            height: "100px",
                            boxShadow: "0 0 4px",
                        }}
                    />
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
                        >
                            Update Picture
                        </Button>
                    )}
                    <Typography variant="h4">
                        {userDetails?.displayName}
                    </Typography>
                    <Typography variant="h5">{userDetails?.email}</Typography>
                    <Button
                        variant={editing ? "contained" : "outlined"}
                        onClick={() => setEditing((prev) => !prev)}
                    >
                        Edit Profile
                    </Button>
                    {editing && (
                        <div className="editingInputs">
                            <FormControl
                                sx={{ m: 1, width: 1 }}
                                variant="outlined"
                            >
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
                            >
                                Change Display Name
                            </Button>
                        </div>
                    )}
                </div>
                <div className="user-actions">
                    <div
                        className="action"
                        onClick={() =>
                            setModeColor((prev) =>
                                prev === "light" ? "dark" : "light"
                            )
                        }
                    >
                        {modeColor === "light" ? (
                            <>
                                <DarkModeIcon />
                                Switch To Dark-Mode
                            </>
                        ) : (
                            <>
                                <LightModeIcon />
                                Switch To Light-Mode
                            </>
                        )}
                    </div>

                    <Divider orientation="horizontal" sx={{ width: 1 }} />
                    <Link>
                        <div className="action">
                            <ShieldIcon />
                            Security
                        </div>
                    </Link>
                    <Divider orientation="horizontal" sx={{ width: 1 }} />
                    <Link to="/about">
                        <div className="action">
                            <InfoIcon />
                            About
                        </div>
                    </Link>
                    <Divider orientation="horizontal" sx={{ width: 1 }} />

                    <div
                        className="action"
                        style={{ color: "#ee2740" }}
                        onClick={handleLogout}
                    >
                        <LogoutIcon color="#ee2740" />
                        Logout
                    </div>
                    <Divider orientation="horizontal" sx={{ width: 1 }} />
                    <div
                        className="action"
                        style={{ color: "#ee2740" }}
                        onClick={handleLogoutAll}
                    >
                        <LogoutIcon color="#ee2740" />
                        Logout From All Devices
                    </div>
                </div>
                {msg && <BasicModal msg={msg} setMsg={setMsg} />}
            </div>
        </Slide>
    );
}
