import {
    Button,
    Slide,
    TextField,
    Typography,
    containerClasses,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./Offer.css";
import {
    axiosOffersInstance,
    axiosProductsInstance,
    axiosUsersInstance,
} from "../../utils/utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../../context/AuthContext";
import ProductOfferCard from "../../components/ProductOfferCard/ProductOfferCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BasicModal from "../../components/BasicModal/BasicModal";
export default function Offer() {
    const [senderProducts, setSenderProducts] = useState(null);
    const [senderOffer, setSenderOffer] = useState(null);
    const [receiverProducts, setReceiverProducts] = useState(null);
    const [receiverOffer, setReceiverOffer] = useState(null);
    const [offerInfo, setOfferInfo] = useState(null);
    const { accessToken } = useAuth();
    const [offerEnded, setOfferEnded] = useState(false);
    const [isSender, setIsSender] = useState(true);
    const messageRef = useRef();
    const mobileMsgRef = useRef();
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
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
        if (offerEnded) return;
        setSenderOffer([...senderOffer, product]);
        setSenderProducts(
            senderProducts.filter((prod) => prod._id != product._id)
        );
    };
    const handleSenderOfferClick = (product) => {
        if (offerEnded) return;
        setSenderOffer(senderOffer.filter((prod) => prod._id != product._id));
        setSenderProducts([...senderProducts, product]);
    };
    const handleReceiverProductsClick = (product) => {
        if (offerEnded) return;
        setReceiverOffer([...receiverOffer, product]);
        setReceiverProducts(
            receiverProducts.filter((prod) => prod._id != product._id)
        );
    };
    const handleReceiverOfferClick = (product) => {
        if (offerEnded) return;
        setReceiverOffer(
            receiverOffer.filter((prod) => prod._id != product._id)
        );
        setReceiverProducts([...receiverProducts, product]);
    };
    const handleOfferUpdate = async (stat) => {
        try {
            const decoded = jwtDecode(accessToken);
            const updatedStatusArr = offerInfo.status.map((prev) =>
                prev.userId === decoded._id
                    ? { userId: prev.userId, status: stat }
                    : prev
            );
            let completed = null;
            if (
                updatedStatusArr.length === 2 &&
                updatedStatusArr.every((stat) => stat.status === "Accepted")
            ) {
                completed = true;
            }
            if (
                updatedStatusArr.length === 2 &&
                updatedStatusArr.some((stat) => stat.status === "Rejected")
            ) {
                updatedStatusArr[0].status = "Rejected";
                updatedStatusArr[1].status = "Rejected";
                completed = false;
            }
            let conversation = [...offerInfo.conversation];
            let message = {};
            console.log(messageRef);
            if (messageRef.current.value.length > 0) {
                if (offerInfo.sender._id === decoded._id) {
                    message.sender = offerInfo.sender.displayName;
                } else {
                    message.sender = offerInfo.receiver.displayName;
                }
                message.content = messageRef.current.value;
                conversation.push(message);
                console.log(conversation);
                messageRef.current.value = "";
            }
            let reqBody;
            if (completed !== null) {
                reqBody = {
                    senderProducts: senderOffer,
                    receiverProducts: receiverOffer,
                    status: updatedStatusArr,
                    conversation,
                    completed,
                };
            } else {
                reqBody = {
                    senderProducts: senderOffer,
                    receiverProducts: receiverOffer,
                    status: updatedStatusArr,
                    conversation,
                };
            }

            const result = await axiosOffersInstance.patch(
                `/${offerInfo._id}`,
                reqBody,
                {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }
            );
            if (result.data.completed !== undefined) {
                if (result.data.completed) {
                    setMsg({
                        title: "Success",
                        message: "Trade Ended Successfully",
                    });
                } else {
                    setMsg({ title: "Failure", message: "Trade Was Rejected" });
                }
            } else {
                setMsg({ title: "Success", message: "Offer Updated" });
            }
            console.log(result.data);
            setOfferInfo(result.data);
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

        if (offerInfo?.completed !== undefined) {
            setOfferEnded(true);
        }
    }, [offerInfo]);
    return (
        <>
            <div className="mobile-container">
                <div className="user-switch">
                    <Button
                        variant={isSender ? "contained" : "outlined"}
                        onClick={() => setIsSender(true)}
                    >
                        Sender
                    </Button>
                    <Button
                        variant={!isSender ? "contained" : "outlined"}
                        onClick={() => setIsSender(false)}
                    >
                        Receiver
                    </Button>
                </div>
                {isSender ? (
                    <div className="user-mobile-container">
                        <div className="info">
                            <Typography variant="h6">
                                {offerInfo?.sender.displayName},
                            </Typography>
                            <Typography variant="h6">
                                Status: {offerInfo?.status[0]?.status}
                            </Typography>
                        </div>
                        <Typography variant="p">Offer</Typography>
                        <div className="sender-container">
                            {senderOffer &&
                                senderOffer.map((product) => (
                                    <div
                                        key={product._id}
                                        onClick={() =>
                                            handleSenderOfferClick(product)
                                        }
                                    >
                                        <ProductOfferCard
                                            productInfo={product}
                                        />
                                    </div>
                                ))}
                        </div>
                        <Typography variant="p">Your Products</Typography>
                        <div className="sender-container">
                            {senderProducts &&
                                senderProducts?.map((product) => (
                                    <div
                                        key={product._id}
                                        onClick={() =>
                                            handleSenderProductsClick(product)
                                        }
                                    >
                                        <ProductOfferCard
                                            productInfo={product}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                ) : (
                    <div className="user-mobile-container">
                        <div className="info">
                            <Typography variant="h6">
                                {offerInfo?.receiver.displayName},
                            </Typography>
                            <Typography variant="h6">
                                Status: {offerInfo?.status[1]?.status}
                            </Typography>
                        </div>
                        <Typography variant="p">Offer</Typography>
                        <div className="receiver-container">
                            {receiverOffer &&
                                receiverOffer.map((product) => (
                                    <div
                                        key={product._id}
                                        onClick={() =>
                                            handleReceiverOfferClick(product)
                                        }
                                    >
                                        <ProductOfferCard
                                            productInfo={product}
                                        />
                                    </div>
                                ))}
                        </div>
                        <Typography variant="p">Your Products</Typography>
                        <div className="receiver-container">
                            {receiverProducts &&
                                receiverProducts?.map((product) => (
                                    <div
                                        key={product._id}
                                        onClick={() =>
                                            handleReceiverProductsClick(product)
                                        }
                                    >
                                        <ProductOfferCard
                                            productInfo={product}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
                <div className="bottom-offer-container">
                    <div className="text-container">
                        <div className="messages-container">
                            <ul>
                                {offerInfo?.conversation?.map((msg, index) => (
                                    <li key={index}>
                                        {`${msg.sender}: ${msg.content}`}{" "}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <TextField
                            multiline
                            minRows={1}
                            placeholder="Enter Your Message Here..."
                            label="Text Message"
                            sx={{ width: "300px" }}
                            inputRef={messageRef}
                        />
                    </div>
                    <div className="buttons-container">
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={() => handleOfferUpdate("Pending")}
                            disabled={offerEnded}
                        >
                            Update Offer
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleOfferUpdate("Accepted")}
                            disabled={offerEnded}
                        >
                            Accept Offer
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleOfferUpdate("Rejected")}
                            disabled={offerEnded}
                        >
                            Reject Offer
                        </Button>
                        {offerEnded && (
                            <Typography variant="h4">Trade Ended</Typography>
                        )}
                    </div>
                </div>

                {msg && <BasicModal msg={msg} setMsg={setMsg} />}
            </div>
        </>
    );
}
