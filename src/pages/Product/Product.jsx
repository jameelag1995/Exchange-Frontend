import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosProductsInstance } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import BasicModal from "../../components/BasicModal/BasicModal";
import { Button, Typography } from "@mui/material";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import "./Product.css";
export default function Product() {
    const [msg, setMsg] = useState("");
    const params = useParams();
    const { accessToken } = useAuth();
    const [productInfo, setProductInfo] = useState(null);
    const fetchProductData = async () => {
        try {
            const result = await axiosProductsInstance.get(
                `/${params.productId}`,
                {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }
            );
            console.log(result.data);
            setProductInfo(result.data);
        } catch (error) {
            setMsg(error.response.data);
        }
    };
    useEffect(() => {
        fetchProductData();
    }, []);
    return (
        <div className="Product Page">
            <ImageCarousel images={productInfo?.pictures} />
            <div className="product-info-container">
                <div className="product-container">
                    <Typography variant="h5">{productInfo?.title}</Typography>
                    <Typography variant="h6" color="green">
                        {productInfo?.type}
                    </Typography>
                </div>
                <Typography variant="p">{productInfo?.color}</Typography>
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
            <Button variant="contained" color="success">
                Send an offer
            </Button>
            {msg && <BasicModal msg={msg} setMsg={setMsg} />}
        </div>
    );
}
