import { Box, CircularProgress, Typography, Fade } from "@mui/material";
import { useState, useEffect } from "react";

export default function CircularIndeterminate({ message = "Loading...", size = 40 }) {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? "" : prev + ".");
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <Fade in={true} timeout={800}>
            <Box 
                sx={{ 
                    display: "flex", 
                    flexDirection: "column",
                    alignItems: "center", 
                    justifyContent: "center",
                    gap: 2,
                    minHeight: "200px",
                    width: "100%"
                }}
            >
                <CircularProgress 
                    size={size}
                    thickness={4}
                    sx={{
                        color: 'primary.main',
                        '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                        },
                    }}
                />
                {message && (
                    <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ 
                            fontWeight: 500,
                            letterSpacing: 0.5,
                            animation: 'pulse 2s ease-in-out infinite',
                            '@keyframes pulse': {
                                '0%, 100%': {
                                    opacity: 1,
                                },
                                '50%': {
                                    opacity: 0.7,
                                },
                            },
                        }}
                    >
                        {message}{dots}
                    </Typography>
                )}
            </Box>
        </Fade>
    );
}
