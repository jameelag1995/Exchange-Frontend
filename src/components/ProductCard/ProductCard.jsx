import { Button, Typography } from "@mui/material";
import "./ProductCard.css";

export default function ProductCard({ productInfo }) {
    return (
        <div className="ProductCard">
            <img src={productInfo?.pictures[0]} alt="" />
            <div className="product-info-container">
                <div className="product-container">
                    <Typography variant="h5">{productInfo?.title}</Typography>
                    <Typography variant="h6" color="green">
                        {productInfo?.type}
                    </Typography>
                </div>
                <Typography variant="p">{productInfo?.description}</Typography>
                <Typography variant="p">
                    {productInfo?.canBeTradedFor.join(", ")}
                </Typography>
                <div className="product-container">
                    <Typography variant="h6">
                        Estimated Value: {productInfo?.estimatedValue}$
                    </Typography>
                </div>
            </div>

            <Button variant="outlined" fullWidth>
                visit product page
            </Button>
        </div>
    );
}
