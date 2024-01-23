import { Button, Divider, Slide, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";
import "./OfferCard.css";
import Review from "../Review/Review";
export default function OfferCard({ offerInfo, myId, setMsg, msg }) {
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
    return (
        <>
            <div className="OfferCard">
                <div className="users-names">
                    <Typography variant="p">{senderName}</Typography>
                    <ArrowRightAltIcon />
                    <Typography variant="p">{receiverName}</Typography>
                </div>
                <Typography variant="p">Created: {timeCreated}</Typography>
                <Typography variant="p">Offer Status: {offerStatus}</Typography>
                <Typography variant="p">Last Update: {timeUpdated}</Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate(`/offer/${offerInfo?._id}`)}
                >
                    Go To Offer
                </Button>
                {offerInfo.completed !== undefined && (
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => setWritingReview((prev) => !prev)}
                    >
                        Write Review
                    </Button>
                )}
            </div>
            {writingReview && (
                <Review offerInfo={offerInfo} setMsg={setMsg} msg={msg} />
            )}
            <Divider orientation="horizontal" sx={{ width: 1 }} />
        </>
    );
}
