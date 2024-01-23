import {
    BottomNavigation,
    BottomNavigationAction,
    Hidden,
    Paper,
} from "@mui/material";
import { AccountCircle, Dashboard, Inventory } from "@mui/icons-material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function BottomNavbar() {
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const handleChange = (event, newValue) => {
        const decoded = jwtDecode(accessToken);
        if (newValue === "reviews") {
            navigate(`/reviews/${decoded._id}`);
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
                <BottomNavigation value={value} onChange={handleChange}>
                    <BottomNavigationAction
                        label="Dashboard"
                        value="dashboard"
                        icon={<Dashboard />}
                    />
                    <BottomNavigationAction
                        label="My Products"
                        value="my-products"
                        icon={<Inventory />}
                    />
                    <BottomNavigationAction
                        label="My Offers"
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
                </BottomNavigation>
            </Paper>
        </Hidden>
    );
}
