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
            <img src={productInfo?.pictures[0]} alt="" />
            <div className="product-info-container">
                <div
                    className="product-container"
                    style={{ flexDirection: "column", alignItems: "center" }}
                >
                    <Typography variant="p">
                        <b>{productInfo?.title}</b>
                    </Typography>
                </div>
                <Divider orientation="horizontal" sx={{ width: 1 }} />
                <div className="product-container">
                    <Typography variant="p" color="green">
                        <b>Type: </b>
                        {productInfo?.type}
                    </Typography>
                    <Typography variant="p">
                        <b>Color: </b>
                        {productInfo?.color}
                    </Typography>
                    <Typography variant="p">
                        <b>Category: </b>
                        {productInfo?.category}
                        <br />
                        <b>Sub-Category: </b>
                        {productInfo?.subCategory}
                    </Typography>
                </div>
                <Typography
                    variant="p"
                    sx={{ maxHeight: "50px", overflow: "hidden" }}
                >
                    <b>Description: </b>
                    <br />
                    {productInfo?.description}
                </Typography>
                <Typography variant="p">
                    <b>Can be traded for: </b>
                    <br />
                    {productInfo?.canBeTradedFor.join(", ")}
                </Typography>
                <Typography variant="p">
                    <b>Estimated Value: </b>
                    {productInfo?.estimatedValue}$
                </Typography>
                <Divider orientation="horizontal" sx={{ width: 1 }} />
                <div className="product-container">
                    <div className="info-usr-container">
                        <Avatar
                            src={productInfo?.currentOwner?.profilePicture}
                            sx={{
                                width: "20px",
                                height: "20px",
                                boxShadow: "0 0 4px",
                            }}
                        />
                        <Typography variant="p">
                            {productInfo?.currentOwner?.displayName}
                        </Typography>
                    </div>
                    <div
                        className="location"
                        style={{
                            display: "flex",
                            justifyContent: "start",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <LocationOnIcon />
                        <Typography variant="p">
                            {productInfo?.location}
                        </Typography>
                    </div>
                </div>
            </div>

            {decoded._id === productInfo?.currentOwner?._id &&
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
            <Button variant="contained" fullWidth onClick={handleVisitPage}>
                visit product page
            </Button>
        </div>
    );
}
