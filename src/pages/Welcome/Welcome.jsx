import { Button, Slide, Typography, Box, Container } from "@mui/material";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const navigate = useNavigate();
    return (
        <Slide direction="up" in>
            <Container 
                maxWidth="sm" 
                sx={{ 
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    py: 4
                }}
            >
                <Box 
                    sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                        width: '100%'
                    }}
                >
                    <img 
                        src="/lightLogonobg.png" 
                        alt="BarterNest" 
                        style={{
                            maxWidth: '300px',
                            width: '100%',
                            height: 'auto'
                        }}
                    />

                    <Typography
                        variant="h4"
                        fontFamily="caveat"
                        sx={{ 
                            textAlign: "center", 
                            color: "#bd8959",
                            lineHeight: 1.4,
                            maxWidth: '600px'
                        }}
                    >
                        Where you save our planet, and we save your money.
                    </Typography>

                    <Button
                        onClick={() => navigate("/auth/login")}
                        variant="contained"
                        size="large"
                        sx={{ 
                            mt: 2,
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            borderRadius: 2
                        }}
                    >
                        Let&apos;s Get Started
                    </Button>
                </Box>
            </Container>
        </Slide>
    );
}
