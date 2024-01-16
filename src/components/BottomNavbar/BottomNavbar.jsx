import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { AccountCircle, Dashboard } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BottomNavbar() {
    const [value, setValue] = useState("dashboard");
    const navigate = useNavigate();
    const handleChange = (event, newValue) => {
        navigate(`/${newValue}`);
        setValue(newValue);
    };
    return (
        <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
        >
            <BottomNavigation value={value} onChange={handleChange}>
                <BottomNavigationAction
                    label="Dashboard"
                    value="dashboard"
                    icon={<Dashboard />}
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
