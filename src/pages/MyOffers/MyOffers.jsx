import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosOffersInstance } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import OfferCard from "../../components/OfferCard/OfferCard";
import BasicModal from "../../components/BasicModal/BasicModal";

export default function MyOffers() {
    const [myOffers, setMyOffers] = useState([]);
    const { accessToken } = useAuth();
    const [msg, setMsg] = useState("");
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

            setMyOffers(result.data);
        } catch (error) {
            setMsg(error.response.data);
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
                    setMsg={setMsg}
                    msg={msg}
                    myId={decoded._id}
                    offerInfo={offer}
                    key={offer._id}
                />
            ))}
            {msg && <BasicModal msg={msg} setMsg={setMsg} />}
        </div>
    );
}
