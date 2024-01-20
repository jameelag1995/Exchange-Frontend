import { Typography } from "@mui/material";
import React from "react";
import "./ProductOfferCard.css";
export default function ProductOfferCard({ productInfo }) {
    return (
        <div className="ProductOfferCard">
            <img src={productInfo?.pictures[0]} alt="" />
            <div className="info-container">
                <Typography variant="p">Title: {productInfo?.title}</Typography>
                <Typography variant="p">
                    Category: {productInfo?.category}
                </Typography>
                <Typography variant="p">
                    Estimated value:{productInfo?.estimatedValue}$
                </Typography>
            </div>
        </div>
    );
}
