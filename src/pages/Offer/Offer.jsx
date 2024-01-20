import { Slide, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Offer.css";
import { axiosProductsInstance, axiosUsersInstance } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import ProductOfferCard from "../../components/ProductOfferCard/ProductOfferCard";
import { useLocation, useParams } from "react-router-dom";
export default function Offer() {
    const [senderProducts, setSenderProducts] = useState([]);
    const [senderOffer, setSenderOffer] = useState([]);
    const [receiverProducts, setReceiverProducts] = useState([]);
    const { accessToken } = useAuth();
    const location = useLocation();
    const [selectedProduct, setSelectedProduct] = useState(
        location.state?.data
    );
    const [receiverOffer, setReceiverOffer] = useState([selectedProduct]);
    const receiver = location.state?.data?.currentOwner;
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
                case "receiver":
                    result = await axiosProductsInstance(
                        `/by-userId/${receiver._id}`,
                        {
                            headers: {
                                Authorization: "Bearer " + accessToken,
                            },
                        }
                    );
                    console.log(result.data);
                    setReceiverProducts(
                        result.data.filter(
                            (product) => product._id != selectedProduct._id
                        )
                    );
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleSenderProductsClick = (product) => {
        setSenderOffer([...senderOffer, product]);
        setSenderProducts(
            senderProducts.filter((prod) => prod._id != product._id)
        );
    };
    const handleSenderOfferClick = (product) => {
        setSenderOffer(senderOffer.filter((prod) => prod._id != product._id));
        setSenderProducts([...senderProducts, product]);
    };
    const handleReceiverProductsClick = (product) => {
        setReceiverOffer([...receiverOffer, product]);
        setReceiverProducts(
            receiverProducts.filter((prod) => prod._id != product._id)
        );
    };
    const handleReceiverOfferClick = (product) => {
        setReceiverOffer(
            receiverOffer.filter((prod) => prod._id != product._id)
        );
        setReceiverProducts([...receiverProducts, product]);
    };
    useEffect(() => {
        fetchData("sender");
        fetchData("receiver");
        console.log(receiverProducts);
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
                    <div className="sender-container">
                        {senderOffer.map((product) => (
                            <div
                                key={product._id}
                                onClick={() => handleSenderOfferClick(product)}
                            >
                                <ProductOfferCard productInfo={product} />
                            </div>
                        ))}
                    </div>
                    <div className="receiver-container">
                        {receiverOffer.map((product) => (
                            <div
                                key={product._id}
                                onClick={() =>
                                    handleReceiverOfferClick(product)
                                }
                            >
                                <ProductOfferCard productInfo={product} />
                            </div>
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
                            <div
                                key={product._id}
                                onClick={() =>
                                    handleSenderProductsClick(product)
                                }
                            >
                                <ProductOfferCard productInfo={product} />
                            </div>
                        ))}
                    </div>
                    <div className="receiver-container">
                        {receiverProducts.map((product) => (
                            <div
                                key={product._id}
                                onClick={() =>
                                    handleReceiverProductsClick(product)
                                }
                            >
                                <ProductOfferCard productInfo={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </Slide>
        </div>
    );
}
