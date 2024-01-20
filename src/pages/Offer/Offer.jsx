import { Slide, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Offer.css";
import { axiosProductsInstance, axiosUsersInstance } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import ProductOfferCard from "../../components/ProductOfferCard/ProductOfferCard";
import { useParams } from "react-router-dom";
export default function Offer() {
    const [senderProducts, setSenderProducts] = useState([]);
    const [senderOffer, setSenderOffer] = useState([]);
    const [receiverProducts, setReceiverProducts] = useState([]);
    const [receiverOffer, setReceiverOffer] = useState([]);
    const { accessToken } = useAuth();
    const params = useParams();
    const fetchData = async (dataType) => {
        try {
            let result;
            switch (dataType) {
                case "sender":
                    result = await axiosUsersInstance.get("/me", {
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    });

                    console.log(result);
                    setSenderProducts(result.data.products);
                    break;
                case "receiver-offer":
                    result = await axiosProductsInstance(
                        `/${params.productId}`,
                        {
                            headers: {
                                Authorization: "Bearer " + accessToken,
                            },
                        }
                    );
                    console.log(result.data);
                    setReceiverOffer([result.data]);
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData("sender");
        fetchData("receiver-offer");
    }, []);
    return (
        <div className="Offer Page">
            <Typography variant="h4">Offer</Typography>
            <Slide
                direction="left"
                in
                style={{ transitionDelay: 1000, transitionDuration: 1000 }}
                mountOnEnter
            >
                <div className="offer-container">
                    <div className="sender-container"></div>
                    <div className="receiver-container">
                        {receiverOffer.map((product) => (
                            <ProductOfferCard
                                productInfo={product}
                                key={product._id}
                            />
                        ))}
                    </div>
                </div>
            </Slide>
            <Typography variant="h4">Your Current Products</Typography>
            <Slide
                direction="right"
                in
                style={{ transitionDelay: 1000, transitionDuration: 1000 }}
                mountOnEnter
            >
                <div className="products-to-offer-container">
                    <div className="sender-container">
                        {senderProducts.map((product) => (
                            <ProductOfferCard
                                productInfo={product}
                                key={product._id}
                            />
                        ))}
                    </div>
                    <div className="receiver-container"></div>
                </div>
            </Slide>
        </div>
    );
}
