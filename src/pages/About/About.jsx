import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

const About = () => {
    return (
        <div className="About Page">
            <Typography variant="h4" gutterBottom>
                About BarterNest
            </Typography>
            <Typography variant="h6" paragraph textAlign="left" width={1}>
                Definition: barter is a system of exchange in which participants
                in a transaction directly exchange goods or services for other
                goods or services without using a medium of exchange, such as
                money.
            </Typography>
            <Typography variant="h5" paragraph textAlign="left" width={1}>
                Barter Nest offers several compelling reasons for users to
                choose our platform:
            </Typography>
            <div
                className="about-sections"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    gap: "16px",
                }}
            >
                <Card sx={{ width: "500px", height: "200px" }}>
                    <CardContent>
                        <Typography variant="h6" component="div" mb={2}>
                            Flexibility and Variety
                        </Typography>
                        <Typography variant="body1">
                            Users can trade a wide range of items and services,
                            providing flexibility and variety in the types of
                            exchanges possible. This versatility caters to a
                            broad audience with different needs and interests.
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ width: "500px", height: "200px" }}>
                    <CardContent>
                        <Typography variant="h6" component="div" mb={2}>
                            User-Friendly Interface
                        </Typography>
                        <Typography variant="body1">
                            The website features a user-friendly interface,
                            making it easy for users to navigate, list their
                            items/services, and find potential trade partners
                            effortlessly.
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ width: "500px", height: "200px" }}>
                    <CardContent>
                        <Typography variant="h6" component="div" mb={2}>
                            Cost-Efficient
                        </Typography>
                        <Typography variant="body1">
                            By facilitating direct barter exchanges, Barter Nest
                            helps users save money that would otherwise be spent
                            on traditional purchasing methods. This can be
                            especially appealing for those looking to reduce
                            costs.
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ width: "500px", height: "200px" }}>
                    <CardContent>
                        <Typography variant="h6" component="div" mb={2}>
                            Diverse Trading Opportunities
                        </Typography>
                        <Typography variant="body1">
                            Barter Nest provides a diverse and extensive network
                            of users, creating ample opportunities for
                            individuals and businesses to engage in mutually
                            beneficial trades.
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ width: "500px", height: "200px" }}>
                    <CardContent>
                        <Typography variant="h6" component="div" mb={2}>
                            Community Engagement
                        </Typography>
                        <Typography variant="body1">
                            The platform fosters a sense of community among
                            users, encouraging collaboration and communication.
                            This community-driven approach enhances the overall
                            bartering experience.
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ width: "500px", height: "200px" }}>
                    <CardContent>
                        <Typography variant="h6" component="div" mb={2}>
                            Environmentally Friendly
                        </Typography>
                        <Typography variant="body1">
                            Bartering promotes the reuse of items and reduces
                            unnecessary waste. Barter Nest contributes to
                            environmentally friendly practices by encouraging
                            the exchange of goods and services rather than the
                            constant production of new items.
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ width: "500px", height: "200px" }}>
                    <CardContent>
                        <Typography variant="h6" component="div" mb={2}>
                            Feedback and Ratings
                        </Typography>
                        <Typography variant="body1">
                            The platform allows users to leave feedback and
                            ratings after completing trades, enhancing
                            transparency and trust within the community.
                            Positive feedback builds credibility for users
                            engaging in future transactions.
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ width: "500px", height: "200px" }}>
                    <CardContent>
                        <Typography variant="h6" component="div" mb={2}>
                            Mobile Accessibility
                        </Typography>
                        <Typography variant="body1">
                            Barter Nest offers a mobile-friendly experience,
                            allowing users to trade on-the-go through a
                            responsive and accessible website or dedicated
                            mobile application.
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ width: "500px", height: "200px" }}>
                    <CardContent>
                        <Typography variant="h6" component="div" mb={2}>
                            Smart Matching Algorithm
                        </Typography>
                        <Typography variant="body1">
                            Barter Nest employs an intelligent matching
                            algorithm that suggests potential trades based on
                            user preferences, increasing the likelihood of
                            successful exchanges.
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <Typography variant="h5" paragraph textAlign="left" width={1}>
                Ultimately, Barter Nest aims to revolutionize the way people
                think about transactions by providing a platform that encourages
                collaboration, sustainability, and a sense of community.
            </Typography>
        </div>
    );
};

export default About;
