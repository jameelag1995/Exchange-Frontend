import { Button, Slide, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Offer.css";
import {
    axiosOffersInstance,
    axiosProductsInstance,
    axiosUsersInstance,
} from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import ProductOfferCard from "../../components/ProductOfferCard/ProductOfferCard";
import { useLocation, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export default function Offer() {
    const [senderProducts, setSenderProducts] = useState(null);
    const [senderOffer, setSenderOffer] = useState(null);
    const [receiverProducts, setReceiverProducts] = useState(null);
    const [receiverOffer, setReceiverOffer] = useState(null);
    const [offerInfo, setOfferInfo] = useState(null);
    const { accessToken } = useAuth();

    const params = useParams();
    const fetchData = async (dataType) => {
        try {
            let result;
            switch (dataType) {
                case "sender":
                    result = await axiosProductsInstance(
                        `/by-userId/${offerInfo.sender._id}`,
                        {
                            headers: {
                                Authorization: "Bearer " + accessToken,
                            },
                        }
                    );
                    setSenderProducts(
                        result.data.filter(
                            (prod1) =>
                                !senderOffer.some(
                                    (prod2) => prod2._id === prod1._id
                                )
                        )
                    );
                    break;
                case "receiver":
                    result = await axiosProductsInstance(
                        `/by-userId/${offerInfo.receiver._id}`,
                        {
                            headers: {
                                Authorization: "Bearer " + accessToken,
                            },
                        }
                    );
                    setReceiverProducts(
                        result.data.filter(
                            (prod1) =>
                                !receiverOffer.some(
                                    (prod2) => prod2._id === prod1._id
                                )
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
    const fetchOffer = async () => {
        try {
            const result = await axiosOffersInstance.get(`/${params.offerId}`, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
            console.log(result.data);
            setOfferInfo(() => result.data);
            setReceiverOffer([...result.data.receiverProducts]);
            setSenderOffer([...result.data.senderProducts]);
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
    const handleOfferUpdate = async () => {
        try {
            const decoded = jwtDecode(accessToken);
            const reqBody = {
                senderProducts: senderOffer,
                receiverProducts: receiverOffer,
                status: [
                    ...offerInfo.status,
                    { userId: decoded._id, status: "Pending" },
                ],
            };
            const result = await axiosOffersInstance.patch(
                `/${offerInfo._id}`,
                reqBody,
                {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }
            );
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (accessToken) fetchOffer();
        console.log(accessToken);

        // console.log(receiverProducts);
    }, [accessToken]);
    useEffect(() => {
        if (offerInfo) {
            fetchData("sender");
            fetchData("receiver");
        }
    }, [offerInfo]);
    return (
        <div className="Offer Page">
            <Typography variant="h4">Offer Status:Pending</Typography>
            <Slide
                direction="left"
                in
                style={{ transitionDelay: 1000, transitionDuration: 1000 }}
                mountOnEnter
            >
                <div className="offer-container">
                    <div className="sender-container">
                        {senderOffer &&
                            senderOffer.map((product) => (
                                <div
                                    key={product._id}
                                    onClick={() =>
                                        handleSenderOfferClick(product)
                                    }
                                >
                                    <ProductOfferCard productInfo={product} />
                                </div>
                            ))}
                    </div>
                    <div className="buttons-container">
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={handleOfferUpdate}
                        >
                            Update Offer
                        </Button>
                        <Button variant="contained" color="success">
                            Accept Offer
                        </Button>
                        <Button variant="contained" color="error">
                            Reject Offer
                        </Button>
                    </div>
                    <div className="receiver-container">
                        {receiverOffer &&
                            receiverOffer.map((product) => (
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
            <div className="offer-sides-info">
                <Typography variant="h4">
                    {offerInfo?.sender.displayName}
                </Typography>
                <Typography variant="h4">Your Current Products</Typography>
                <Typography variant="h4">
                    {offerInfo?.receiver.displayName}
                </Typography>
            </div>
            <Slide
                direction="right"
                in
                style={{ transitionDelay: 1000, transitionDuration: 1000 }}
                mountOnEnter
            >
                <div className="products-to-offer-container">
                    <div className="sender-container">
                        {senderProducts &&
                            senderProducts?.map((product) => (
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
                        {receiverProducts &&
                            receiverProducts?.map((product) => (
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
