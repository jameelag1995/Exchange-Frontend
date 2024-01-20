import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosProductsInstance } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import BasicModal from "../../components/BasicModal/BasicModal";
import { Button, Typography } from "@mui/material";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import "./Product.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { jwtDecode } from "jwt-decode";
export default function Product() {
    const [msg, setMsg] = useState("");
    const params = useParams();
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const decoded = jwtDecode(accessToken);
    const [productInfo, setProductInfo] = useState(null);

    const handleMoveToOfferPage = () => {
        navigate(`/offer/${productInfo?.currentOwner._id}`, {
            state: { data: productInfo },
        });
    };

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
        if (!accessToken) navigate("/login");
    }, []);
    return (
        <div className="Product Page">
            <ArrowBackIcon
                sx={{
                    position: "absolute",
                    zIndex: "10",
                    left: "16px",
                    top: "16px",
                    cursor: "pointer",
                }}
                onClick={() => navigate(-1)}
            />
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
                    <Typography variant="p">
                        Estimated Value: {productInfo?.estimatedValue}$
                    </Typography>
                    <Typography variant="p">
                        {productInfo?.currentOwner?.displayName}
                    </Typography>
                </div>
            </div>
            {decoded._id !== productInfo?.currentOwner && (
                <Button
                    variant="contained"
                    color="success"
                    sx={{ mb: "16px" }}
                    // onClick={() => navigate(`/offer/${productInfo?._id}`)}
                    onClick={handleMoveToOfferPage}
                >
                    Send an offer
                </Button>
            )}
            {msg && <BasicModal msg={msg} setMsg={setMsg} />}
        </div>
    );
}
