import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosProductsInstance } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import BasicModal from "../../components/BasicModal/BasicModal";
import "./MyProducts.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ProductForm from "../../components/ProductForm/ProductForm";
export default function MyProducts() {
    const [productsData, setProductsData] = useState();
    const [editProduct, setEditProduct] = useState(false);
    const [msg, setMsg] = useState(null);
    const { accessToken } = useAuth();
    const fetchMyProducts = async () => {
        try {
            const result = await axiosProductsInstance.get("/myProducts", {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
            setProductsData(result.data);
        } catch (error) {
            setMsg(error.response.data);
        }
    };
    useEffect(() => {
        fetchMyProducts();
    }, []);
    return (
        <div className="MyProducts Page">
            <Typography variant="h3">My Products</Typography>
            <div className="my-products-container">
                {productsData?.map((product) => (
                    <ProductCard key={product?._id} productInfo={product} />
                ))}
                <div className="add-new-product">
                    <AddBoxIcon
                        onClick={() => setEditProduct(true)}
                        sx={{
                            height: "250px",
                            width: "150px",
                            ":hover": {
                                color: "secondary.main",
                                cursor: "pointer",
                            },
                        }}
                    />
                </div>
            </div>
            {editProduct && (
                <ProductForm
                    editingProduct={editProduct}
                    setEditingProduct={setEditProduct}
                />
            )}
            {msg && <BasicModal msg={msg} setMsg={setMsg} />}
        </div>
    );
}
