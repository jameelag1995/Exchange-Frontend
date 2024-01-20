import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosProductsInstance } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import BasicModal from "../../components/BasicModal/BasicModal";
import "./MyProducts.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ProductForm from "../../components/ProductForm/ProductForm";
import { useNavigate } from "react-router-dom";
export default function MyProducts() {
    const [productsData, setProductsData] = useState();
    const [addingProduct, setAddingProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState(false);
    const [msg, setMsg] = useState(null);
    const { accessToken } = useAuth();
    const [productToEdit, setProductToEdit] = useState(null);
    const navigate = useNavigate();
    const fetchMyProducts = async () => {
        try {
            const result = await axiosProductsInstance.get("/myProducts", {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
            console.log(result.data);
            setProductsData(result.data);
        } catch (error) {
            setMsg(error.response.data);
        }
    };
    useEffect(() => {
        if (accessToken && !editingProduct && !addingProduct) fetchMyProducts();
        if (!accessToken) navigate("/login");
    }, [addingProduct, editingProduct]);
    return (
        <div className="MyProducts Page">
            <Typography variant="h3">My Products</Typography>
            <div className="my-products-container">
                {productsData?.map((product) => (
                    <ProductCard
                        key={product?._id}
                        setProductToEdit={setProductToEdit}
                        setEditingProduct={setEditingProduct}
                        setProductsData={setProductsData}
                        productInfo={product}
                    />
                ))}
                <div className="add-new-product">
                    <AddBoxIcon
                        onClick={() => setAddingProduct(true)}
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
            {(addingProduct || editingProduct) && (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        zIndex: "1",
                    }}
                >
                    <ProductForm
                        productToEdit={productToEdit}
                        setEditingProduct={setEditingProduct}
                        addingProduct={addingProduct}
                        setAddingProduct={setAddingProduct}
                        setMsg={setMsg}
                    />
                </div>
            )}
            {msg && <BasicModal msg={msg} setMsg={setMsg} />}
        </div>
    );
}
