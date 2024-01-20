import { Typography } from "@mui/material";
import React from "react";
import "./ProductOfferCard.css";
export default function ProductOfferCard({ productInfo }) {
    return (
        <div className="ProductOfferCard">
            <img src={productInfo?.pictures[0]} alt="" />
            <div className="info-container">
                <Typography variant="p">{productInfo?.title}</Typography>
                <Typography variant="p">{productInfo?.category}</Typography>
                <Typography variant="p">
                    {productInfo?.estimatedValue}$
                </Typography>
            </div>
        </div>
    );
}
