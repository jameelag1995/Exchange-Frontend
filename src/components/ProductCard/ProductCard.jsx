import { Button, Typography } from "@mui/material";
import "./ProductCard.css";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { axiosProductsInstance } from "../../utils/utils";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
export default function ProductCard({
    setEditingProduct,
    productInfo,
    setProductsData,
    setProductToEdit,
}) {
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const decoded = jwtDecode(accessToken);
    const location = useLocation();
    console.log(location);
    const handleDelete = async () => {
        try {
            const result = await axiosProductsInstance.delete(
                `/${productInfo?._id}`,
                {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }
            );
            console.log(result.data);
            setProductsData((prev) =>
                prev.filter((product) => product._id !== productInfo._id)
            );
        } catch (error) {
            console.log(error);
        }
    };
    const handleEdit = async () => {
        setProductToEdit(productInfo);
        setEditingProduct(true);
    };
    const handleVisitPage = () => {
        navigate(`/products/${productInfo?._id}`);
    };
    console.log(productInfo);
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
                <div className="product-container">
                    <Typography variant="p">{productInfo?.color}</Typography>
                    <Typography variant="p">{productInfo?.category}</Typography>
                </div>
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

            {decoded._id === productInfo?.currentOwner &&
                !location.pathname.includes("dashboard") && (
                    <>
                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            onClick={handleEdit}
                        >
                            Edit Product
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            fullWidth
                            onClick={handleDelete}
                        >
                            Delete Product
                        </Button>
                    </>
                )}
            <Button variant="outlined" fullWidth onClick={handleVisitPage}>
                visit product page
            </Button>
        </div>
    );
}
