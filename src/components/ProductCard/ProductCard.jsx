import { Avatar, Button, Divider, Slide, Typography } from "@mui/material";
import "./ProductCard.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAuth } from "../../context/AuthContext";
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

    return (
        <div className="ProductCard">
            {/* Fixed image section */}
            <img src={productInfo?.pictures[0]} alt={productInfo?.title || "Product"} />
            
            {/* Scrollable content section */}
            <div className="product-info-container">
                {/* Title Section */}
                <div className="product-container" style={{ flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: "bold", textAlign: "center" }}>
                        {productInfo?.title}
                    </Typography>
                </div>
                
                <Divider orientation="horizontal" sx={{ width: "100%" }} />
                
                {/* Product Details */}
                <div className="product-container">
                    <Typography variant="body2" color="primary" sx={{ fontWeight: "medium" }}>
                        <strong>Type: </strong>
                        {productInfo?.type}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                        <strong>Color: </strong>
                        {productInfo?.color}
                    </Typography>
                </div>
                
                <div style={{ textAlign: "center", width: "100%" }}>
                    <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                        <strong>Category: </strong>
                        {productInfo?.category}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                        <strong>Sub-Category: </strong>
                        {productInfo?.subCategory}
                    </Typography>
                </div>
                
                <Typography
                    variant="body2"
                    sx={{ 
                        maxHeight: "60px", 
                        overflow: "hidden",
                        textAlign: "center",
                        width: "100%",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    <strong>Description: </strong>
                    <br />
                    {productInfo?.description}
                </Typography>
                
                <Typography 
                    variant="body2" 
                    sx={{ 
                        textAlign: "center", 
                        width: "100%",
                        maxHeight: "40px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    <strong>Can be traded for: </strong>
                    <br />
                    {productInfo?.canBeTradedFor.join(", ")}
                </Typography>
                
                <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", textAlign: "center" }}>
                    <strong>Estimated Value: </strong>
                    ${productInfo?.estimatedValue}
                </Typography>
                
                <Divider orientation="horizontal" sx={{ width: "100%" }} />
                
                {/* Owner and Location Info */}
                <div className="product-container">
                    <div className="info-usr-container">
                        <Avatar
                            src={productInfo?.currentOwner?.profilePicture}
                            sx={{
                                width: "24px",
                                height: "24px",
                                boxShadow: "0 0 4px",
                            }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                            {productInfo?.currentOwner?.displayName}
                        </Typography>
                    </div>
                    
                    <div className="location">
                        <LocationOnIcon fontSize="small" />
                        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                            {productInfo?.location}
                        </Typography>
                    </div>
                </div>
            </div>

            {/* Fixed button section at bottom */}
            <div style={{ marginTop: "auto", width: "100%" }}>
                {decoded._id === productInfo?.currentOwner?._id &&
                    !location.pathname.includes("dashboard") && (
                        <>
                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                onClick={handleEdit}
                                sx={{ mb: 1 }}
                                size="small"
                            >
                                Edit Product
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                fullWidth
                                onClick={handleDelete}
                                sx={{ mb: 1 }}
                                size="small"
                            >
                                Delete Product
                            </Button>
                        </>
                    )}
                
                <Button 
                    variant="contained" 
                    fullWidth 
                    onClick={handleVisitPage}
                    size="small"
                >
                    Visit Product Page
                </Button>
            </div>
        </div>
    );
}
