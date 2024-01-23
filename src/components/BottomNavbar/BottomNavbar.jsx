import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { AccountCircle, Dashboard, Inventory } from "@mui/icons-material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function BottomNavbar() {
    const [value, setValue] = useState("dashboard");
    const location = useLocation();
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
    // useEffect(() => {
    //     console.log(location.pathname);
    //     switch (location.pathname) {
    //         case "/reviews":
    //             setValue("Reviews");
    //             break;
    //         case "/dashboard":
    //             setValue("Dashboard");
    //             break;
    //         case "/myProducts":
    //             setValue("My Products");
    //             break;
    //         case "/my-offers":
    //             setValue("My Offers");
    //             break;
    //         case "/profile":
    //             setValue("Profile");
    //             break;
    //     }
    // }, [location.pathname]);
    return (
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
                    value="myProducts"
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
    );
}
