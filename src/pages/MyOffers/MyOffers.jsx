import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosOffersInstance } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import OfferCard from "../../components/OfferCard/OfferCard";

export default function MyOffers() {
    const [myOffers, setMyOffers] = useState([]);
    const { accessToken } = useAuth();
    let decoded;
    if (accessToken) {
        decoded = jwtDecode(accessToken);
    }
    const fetchOffers = async () => {
        try {
            const result = await axiosOffersInstance.get("/my-offers", {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
            console.log(result);
            setMyOffers(result.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchOffers();
    }, []);
    return (
        <div className="MyOffers Page">
            <Typography variant="h3">My Offers</Typography>
            {myOffers?.map((offer) => (
                <OfferCard
                    myId={decoded._id}
                    offerInfo={offer}
                    key={offer._id}
                />
            ))}
        </div>
    );
}
