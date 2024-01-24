import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { axiosOffersInstance, axiosProductsInstance } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import BasicModal from "../../components/BasicModal/BasicModal";
import { Avatar, Button, Typography } from "@mui/material";
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

    const handleMoveToOfferPage = async () => {
        try {
            const offerObj = {
                sender: decoded._id,
                receiver: productInfo.currentOwner._id,
                product: productInfo._id,
                status: [
                    { userId: decoded._id, status: "Pending" },
                    { userId: productInfo.currentOwner._id, status: "Pending" },
                ],
                conversation: [],
            };
            const result = await axiosOffersInstance.post("/create", offerObj, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });

            navigate(`/offer/${result.data._id}`);
        } catch (error) {
            
            setMsg(error.response.data);
        }
        // navigate(`/offer/${productInfo?.currentOwner._id}`, {
        //     state: { data: productInfo },
        // });
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
            setProductInfo(result.data);
        } catch (error) {
            setMsg(error.response.data);
        }
    };
    useEffect(() => {
        if (accessToken) fetchProductData();
    }, [accessToken]);
    return (
        <div className="Product Page">
            <div
                className="back-btn-container"
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                }}
            >
                <ArrowBackIcon
                    sx={{
                        position: "relative",
                        zIndex: "10",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate(-1)}
                />
            </div>
            <ImageCarousel images={productInfo?.pictures} />
            <div className="product-info-container">
                <div className="product-container">
                    <Typography variant="h5">
                        <b>Title: </b>
                        {productInfo?.title}
                    </Typography>
                    <Typography variant="p">
                        <b>Color: </b>
                        {productInfo?.color}
                    </Typography>
                    <Typography variant="p">
                        <b>Category: </b>
                        {productInfo?.category}
                    </Typography>
                    <Typography variant="p">
                        <b>Sub-Category: </b>
                        {productInfo?.subCategory}
                    </Typography>
                    <Typography variant="h6" color="green">
                        <b>Type:</b>
                        {productInfo?.type}
                    </Typography>
                </div>

                <Typography variant="p">
                    <b>Description:</b> <br />
                    {productInfo?.description}
                </Typography>
                <Typography variant="p">
                    <b>Can be traded for: </b>
                    {productInfo?.canBeTradedFor.join(",")}
                </Typography>
                <Typography variant="p">
                    <b>Estimated Value: </b>
                    {productInfo?.estimatedValue}$
                </Typography>
                <div className="product-container">
                    <Typography
                        variant="p"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "center",
                            textAlign: "center",
                            gap: "8px",
                        }}
                    >
                        <b>Owner: </b>

                        <Avatar
                            src={productInfo?.currentOwner?.profilePicture}
                            sx={{
                                boxShadow: "0 0 4px",
                            }}
                        />
                        {productInfo?.currentOwner?.displayName}
                    </Typography>
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
            <div className="product-buttons">
                <Button
                    variant="contained"
                    onClick={() =>
                        navigate(`/reviews/${productInfo?.currentOwner._id}`)
                    }
                >
                    Check User Reviews
                </Button>
                {decoded._id !== productInfo?.currentOwner._id && (
                    <Button
                        variant="contained"
                        color="success"
                        // onClick={() => navigate(`/offer/${productInfo?._id}`)}
                        onClick={handleMoveToOfferPage}
                    >
                        Send an offer
                    </Button>
                )}
            </div>

            {msg && <BasicModal msg={msg} setMsg={setMsg} />}
        </div>
    );
}
