import { Button, Divider, Slide, Typography, Box, Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./OfferCard.css";
import Review from "../Review/Review";

export default function OfferCard({ offerInfo, myId, setMsg, msg }) {
    const { mode } = useTheme();
    const [senderName, setSenderName] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [offerStatus, setOfferStatus] = useState("");
    const [timeCreated, setTimeCreated] = useState("");
    const [timeUpdated, setTimeUpdated] = useState("");
    const navigate = useNavigate();
    const [writingReview, setWritingReview] = useState(false);

    useEffect(() => {
        setTimeCreated(offerInfo?.createdAt.split(".")[0].replace("T", " "));
        setTimeUpdated(offerInfo?.updatedAt.split(".")[0].replace("T", " "));
        if (offerInfo?.sender?._id === myId) {
            setSenderName("You");
            setReceiverName(offerInfo?.receiver?.displayName);
        } else {
            setSenderName(offerInfo?.sender?.displayName);
            setReceiverName("You");
        }
        if (offerInfo?.completed !== undefined) {
            if (offerInfo?.completed) {
                setOfferStatus("Accepted");
            } else {
                setOfferStatus("Rejected");
            }
        } else {
            setOfferStatus("Pending");
        }
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'accepted':
                return 'success';
            case 'rejected':
                return 'error';
            case 'pending':
                return 'warning';
            default:
                return 'default';
        }
    };

    return (
        <>
            <div className="OfferCard" data-theme={mode}>
                <div className="users-names">
                    <Typography variant="h6">{senderName}</Typography>
                    <ArrowRightAltIcon />
                    <Typography variant="h6">{receiverName}</Typography>
                </div>
                
                <div className="offer-info">
                    <Typography variant="body1">
                        <strong>Created</strong>
                        <span>{timeCreated}</span>
                    </Typography>
                    <Typography variant="body1">
                        <strong>Status</strong>
                        <Chip 
                            label={offerStatus} 
                            color={getStatusColor(offerStatus)}
                            size="small"
                            sx={{ 
                                fontWeight: 600,
                                backgroundColor: getStatusColor(offerStatus) === 'success' ? '#2e7d32' :
                                               getStatusColor(offerStatus) === 'error' ? '#d32f2f' :
                                               getStatusColor(offerStatus) === 'warning' ? '#ed6c02' : '#757575',
                                color: '#ffffff'
                            }}
                        />
                    </Typography>
                    <Typography variant="body1">
                        <strong>Last Update</strong>
                        <span>{timeUpdated}</span>
                    </Typography>
                </div>

                <div className="offer-actions">
                    {offerInfo.completed !== undefined ? (
                        <Button
                            variant="outlined"
                            color="warning"
                            onClick={() => setWritingReview((prev) => !prev)}
                            sx={{ 
                                minWidth: 140,
                                borderColor: '#ed6c02',
                                color: '#ed6c02',
                                '&:hover': {
                                    borderColor: '#f57c00',
                                    backgroundColor: 'rgba(237, 108, 2, 0.08)',
                                }
                            }}
                        >
                            Write a Review
                        </Button>
                    ) : (
                        <Box sx={{ width: 140 }} />
                    )}
                    <Button
                        variant="contained"
                        onClick={() => navigate(`/offer/${offerInfo?._id}`)}
                        sx={{ 
                            minWidth: 140,
                            background: mode === 'light' 
                                ? 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)'
                                : 'linear-gradient(135deg, #90caf9 0%, #42a5f5 100%)',
                            color: mode === 'light' ? '#ffffff' : '#000000',
                            '&:hover': {
                                background: mode === 'light' 
                                    ? 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)'
                                    : 'linear-gradient(135deg, #42a5f5 0%, #90caf9 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: mode === 'light' 
                                    ? '0 6px 20px rgba(25, 118, 210, 0.4)'
                                    : '0 6px 20px rgba(144, 202, 249, 0.4)',
                            },
                        }}
                    >
                        Go To Offer
                    </Button>
                </div>
            </div>
            
            {writingReview && (
                <Review offerInfo={offerInfo} setMsg={setMsg} msg={msg} />
            )}
            
            <Divider orientation="horizontal" sx={{ width: 1, my: 2 }} />
        </>
    );
}
