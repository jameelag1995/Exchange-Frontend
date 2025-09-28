import { Typography } from "@mui/material";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import "./ProductOfferCard.css";

export default function ProductOfferCard({ productInfo }) {
    const { mode } = useTheme();
    
    return (
        <div className="ProductOfferCard" data-theme={mode}>
            <img src={productInfo?.pictures[0]} alt={productInfo?.title} />
            <div className="info-container">
                <Typography variant="body2">
                    <strong>Title</strong>
                    <span>{productInfo?.title}</span>
                </Typography>
                <Typography variant="body2">
                    <strong>Category</strong>
                    <span>{productInfo?.category}</span>
                </Typography>
                <Typography variant="body2">
                    <strong>Estimated Value</strong>
                    <span>${productInfo?.estimatedValue}</span>
                </Typography>
            </div>
        </div>
    );
}
