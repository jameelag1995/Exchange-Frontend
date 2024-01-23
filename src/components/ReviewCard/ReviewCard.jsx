import { Avatar, Rating, Typography } from "@mui/material";
import React from "react";
import "./ReviewCard.css";
export default function ReviewCard({ reviewInfo }) {
    return (
        <div className="ReviewCard">
            <div className="review-sender-info">
                <Avatar
                    src={reviewInfo?.sender?.profilePicture}
                    sx={{ width: "30px", height: "30px" }}
                />
                <Typography variant="h6">
                    {reviewInfo?.sender?.displayName}
                </Typography>
            </div>
            <Rating value={reviewInfo?.rating} readOnly />
            <Typography variant="p">{reviewInfo?.content}</Typography>
            <Typography
                variant="body1"
                sx={{ position: "absolute", bottom: "8px", right: "16px" }}
            >
                {reviewInfo?.createdAt.split(".")[0].replace("T", " ")}
            </Typography>
        </div>
    );
}
