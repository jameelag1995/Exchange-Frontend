import React from "react";
import { 
    Container, 
    Typography, 
    Grid, 
    Card, 
    CardContent, 
    Box,
    useTheme,
    Paper
} from "@mui/material";
import { 
    LightbulbOutlined,
    SmartphoneOutlined,
    NatureOutlined,
    PeopleOutlined,
    TrendingUpOutlined,
    SecurityOutlined,
    SpeedOutlined,
    PsychologyOutlined
} from "@mui/icons-material";

const About = () => {
    const theme = useTheme();

    const features = [
        {
            icon: <LightbulbOutlined sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: "Flexibility and Variety",
            description: "Users can trade a wide range of items and services, providing flexibility and variety in the types of exchanges possible. This versatility caters to a broad audience with different needs and interests."
        },
        {
            icon: <SpeedOutlined sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: "User-Friendly Interface",
            description: "The website features a user-friendly interface, making it easy for users to navigate, list their items/services, and find potential trade partners effortlessly."
        },
        {
            icon: <TrendingUpOutlined sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: "Cost-Efficient",
            description: "By facilitating direct barter exchanges, BarterNest helps users save money that would otherwise be spent on traditional purchasing methods. This can be especially appealing for those looking to reduce costs."
        },
        {
            icon: <PeopleOutlined sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: "Diverse Trading Opportunities",
            description: "BarterNest provides a diverse and extensive network of users, creating ample opportunities for individuals and businesses to engage in mutually beneficial trades."
        },
        {
            icon: <SecurityOutlined sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: "Community Engagement",
            description: "The platform fosters a sense of community among users, encouraging collaboration and communication. This community-driven approach enhances the overall bartering experience."
        },
        {
            icon: <NatureOutlined sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: "Environmentally Friendly",
            description: "Bartering promotes the reuse of items and reduces unnecessary waste. BarterNest contributes to environmentally friendly practices by encouraging the exchange of goods and services rather than the constant production of new items."
        },
        {
            icon: <SecurityOutlined sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: "Feedback and Ratings",
            description: "The platform allows users to leave feedback and ratings after completing trades, enhancing transparency and trust within the community. Positive feedback builds credibility for users engaging in future transactions."
        },
        {
            icon: <SmartphoneOutlined sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: "Mobile Accessibility",
            description: "BarterNest offers a mobile-friendly experience, allowing users to trade on-the-go through a responsive and accessible website or dedicated mobile application."
        },
        {
            icon: <PsychologyOutlined sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: "Smart Matching Algorithm",
            description: "BarterNest employs an intelligent matching algorithm that suggests potential trades based on user preferences, increasing the likelihood of successful exchanges."
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4, mt: 8, mb: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography 
                    variant="h3" 
                    component="h1" 
                    gutterBottom
                    sx={{ 
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                        mb: 2
                    }}
                >
                    About BarterNest
                </Typography>
                
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: 4, 
                        mb: 4,
                        background: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.05)' 
                            : 'rgba(25, 118, 210, 0.05)',
                        border: `1px solid ${theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.1)' 
                            : 'rgba(25, 118, 210, 0.1)'}`,
                        borderRadius: 3
                    }}
                >
                    <Typography 
                        variant="h6" 
                        paragraph 
                        sx={{ 
                            color: theme.palette.text.secondary,
                            lineHeight: 1.8,
                            mb: 3
                        }}
                    >
                        <strong>Definition:</strong> Barter is a system of exchange in which participants 
                        in a transaction directly exchange goods or services for other goods or services 
                        without using a medium of exchange, such as money.
                    </Typography>
                    
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                            mb: 2
                        }}
                    >
                        Why Choose BarterNest?
                    </Typography>
                    
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            color: theme.palette.text.secondary,
                            lineHeight: 1.8
                        }}
                    >
                        BarterNest offers several compelling reasons for users to choose our platform, 
                        revolutionizing the way people think about transactions by providing a platform 
                        that encourages collaboration, sustainability, and a sense of community.
                    </Typography>
                </Paper>
            </Box>

            <Grid container spacing={3}>
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card 
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: theme.shadows[8],
                                }
                            }}
                        >
                            <CardContent sx={{ 
                                flexGrow: 1, 
                                display: 'flex', 
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                p: 3
                            }}>
                                <Box sx={{ mb: 2 }}>
                                    {feature.icon}
                                </Box>
                                
                                <Typography 
                                    variant="h6" 
                                    component="h3" 
                                    gutterBottom
                                    sx={{ 
                                        fontWeight: 600,
                                        color: theme.palette.text.primary,
                                        mb: 2
                                    }}
                                >
                                    {feature.title}
                                </Typography>
                                
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        color: theme.palette.text.secondary,
                                        lineHeight: 1.6,
                                        flexGrow: 1
                                    }}
                                >
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 6 }}>
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: 4,
                        background: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.05)' 
                            : 'rgba(46, 125, 50, 0.05)',
                        border: `1px solid ${theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.1)' 
                            : 'rgba(46, 125, 50, 0.1)'}`,
                        borderRadius: 3
                    }}
                >
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            fontWeight: 600,
                            color: theme.palette.success.main,
                            mb: 2
                        }}
                    >
                        Our Mission
                    </Typography>
                    
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            color: theme.palette.text.secondary,
                            lineHeight: 1.8,
                            fontSize: '1.1rem'
                        }}
                    >
                        Ultimately, BarterNest aims to revolutionize the way people think about 
                        transactions by providing a platform that encourages collaboration, 
                        sustainability, and a sense of community. We believe in creating a 
                        world where value is exchanged through meaningful connections rather 
                        than just monetary transactions.
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default About;
