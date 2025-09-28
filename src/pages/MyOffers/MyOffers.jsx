import { Slide, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { axiosOffersInstance } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import OfferCard from "../../components/OfferCard/OfferCard";
import BasicModal from "../../components/BasicModal/BasicModal";
import "./MyOffers.css";

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
            if (result.data.length === 0) {
                setMsg({
                    title: "No Offers",
                    message: "You didn't send or receive any offers yet.",
                });
            }
        } catch (error) {
            setMsg(error.response.data);
        }
    };
    useEffect(() => {
        if (accessToken) fetchOffers();
    }, [accessToken]);
    return (
        <Slide direction="up" in style={{ transitionDelay: 800 }}>
            <div className="MyOffers Page">
                <Typography variant="h3">Offers</Typography>
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
        </Slide>
    );
}
