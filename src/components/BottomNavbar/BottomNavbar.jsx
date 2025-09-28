import {
    BottomNavigation,
    BottomNavigationAction,
    Hidden,
    Paper,
    Box,
    IconButton,
    Tooltip,
} from "@mui/material";
import { AccountCircle, Dashboard, Inventory, Info } from "@mui/icons-material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";

export default function BottomNavbar() {
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    
    const handleChange = (event, newValue) => {
        if (newValue === "reviews") {
            const decoded = jwtDecode(accessToken);
            navigate(`/reviews/${decoded._id}`);
            setValue(newValue);
        } else if (newValue === "about") {
            navigate("/about");
            setValue(newValue);
        } else {
            navigate(`/${newValue}`);
            setValue(newValue);
        }
    };
    
    return (
        <Hidden mdUp>
            <Paper
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: "99",
                }}
                elevation={3}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1 }}>
                    <BottomNavigation 
                        value={value} 
                        onChange={handleChange}
                        sx={{ flex: 1 }}
                        showLabels
                    >
                        <BottomNavigationAction
                            label="Dashboard"
                            value="dashboard"
                            icon={<Dashboard />}
                        />
                        <BottomNavigationAction
                            label="Products"
                            value="my-products"
                            icon={<Inventory />}
                        />
                        <BottomNavigationAction
                            label="Offers"
                            value="my-offers"
                            icon={<ReceiptLongIcon />}
                        />
                        <BottomNavigationAction
                            label="Reviews"
                            value="reviews"
                            icon={<ReviewsIcon />}
                        />
                        <BottomNavigationAction
                            label="Profile"
                            value="profile"
                            icon={<AccountCircle />}
                        />
                        <BottomNavigationAction
                            label="About"
                            value="about"
                            icon={<Info />}
                        />
                    </BottomNavigation>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                        <ThemeSwitch />
                    </Box>
                </Box>
            </Paper>
        </Hidden>
    );
}
