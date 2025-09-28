import { Avatar, Button, Slide, TextField, Typography, Box, Chip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import "./Offer.css";
import { axiosOffersInstance, axiosProductsInstance } from "../../utils/utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../../context/AuthContext";
import ProductOfferCard from "../../components/ProductOfferCard/ProductOfferCard";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BasicModal from "../../components/BasicModal/BasicModal";

export default function Offer() {
    const { mode } = useTheme();
    const [senderProducts, setSenderProducts] = useState(null);
    const [senderOffer, setSenderOffer] = useState(null);
    const [receiverProducts, setReceiverProducts] = useState(null);
    const [receiverOffer, setReceiverOffer] = useState(null);
    const [offerInfo, setOfferInfo] = useState(null);
    const { accessToken } = useAuth();
    const [offerEnded, setOfferEnded] = useState(false);
    const [isSender, setIsSender] = useState(true);
    const messageRef = useRef();
    const [msg, setMsg] = useState("");
    const [isAccepted, setIsAccepted] = useState(false);
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
            setMsg(error.response.data);
        }
    };

    const fetchOffer = async () => {
        try {
            const result = await axiosOffersInstance.get(`/${params.offerId}`, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
            setOfferInfo(() => result.data);
            setReceiverOffer([...result.data.receiverProducts]);
            setSenderOffer([...result.data.senderProducts]);
        } catch (error) {
            setMsg(error.response.data);
        }
    };

    const handleSenderProductsClick = (product) => {
        if (offerEnded) return;
        if (isAccepted) return;
        setSenderOffer([...senderOffer, product]);
        setSenderProducts(
            senderProducts.filter((prod) => prod._id != product._id)
        );
    };

    const handleSenderOfferClick = (product) => {
        if (offerEnded) return;
        if (isAccepted) return;
        setSenderOffer(senderOffer.filter((prod) => prod._id != product._id));
        setSenderProducts([...senderProducts, product]);
    };

    const handleReceiverProductsClick = (product) => {
        if (offerEnded) return;
        if (isAccepted) return;
        setReceiverOffer([...receiverOffer, product]);
        setReceiverProducts(
            receiverProducts.filter((prod) => prod._id != product._id)
        );
    };

    const handleReceiverOfferClick = (product) => {
        if (offerEnded) return;
        if (isAccepted) return;
        setReceiverOffer(
            receiverOffer.filter((prod) => prod._id != product._id)
        );
        setReceiverProducts([...receiverProducts, product]);
    };

    const handleOfferUpdate = async (stat) => {
        try {
            if (
                stat === "Accepted" &&
                (receiverOffer.length === 0 || senderOffer.length === 0)
            ) {
                setMsg({
                    title: "Failure",
                    message: "The Two Parties Must Offer Products.",
                });
                return;
            }
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
            if (messageRef.current.value.length > 0) {
                if (offerInfo.sender._id === decoded._id) {
                    message.sender = offerInfo.sender.displayName;
                } else {
                    message.sender = offerInfo.receiver.displayName;
                }
                message.content = messageRef.current.value;
                conversation.push(message);
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
                        message: "Trade Ended Successfully.",
                    });
                } else {
                    setMsg({ title: "Failure", message: "Trade Was Rejected." });
                }
            } else {
                setMsg({ title: "Success", message: "Offer Updated." });
            }
            setOfferInfo(result.data);
        } catch (error) {
            setMsg(error.response.data);
        }
    };

    useEffect(() => {
        if (accessToken) fetchOffer();
    }, [accessToken]);

    useEffect(() => {
        if (offerInfo) {
            fetchData("sender");
            fetchData("receiver");
            setIsAccepted(
                offerInfo.status.some((stat) => stat.status === "Accepted")
            );
        }

        if (offerInfo?.completed !== undefined) {
            setOfferEnded(true);
            setMsg({
                title: "Trade Ended",
                message: offerInfo?.completed
                    ? "Successful Trade."
                    : "Unsuccessful Trade.",
            });
        }
    }, [offerInfo]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted':
                return 'success';
            case 'rejected':
                return 'error';
            case 'pending':
                return 'warning';
            default:
                return 'default';
        }
    };

    return (
        <Slide direction="up" in style={{ transitionDelay: 800 }}>
            <div className="Offer Page" data-theme={mode}>
                {/* Back Button */}
                <div className="back-btn-container">
                    <ArrowBackIcon 
                        onClick={() => navigate(-1)} 
                        sx={{ 
                            color: mode === 'light' ? '#1976d2' : '#90caf9',
                            cursor: 'pointer',
                            '&:hover': {
                                color: mode === 'light' ? '#1565c0' : '#42a5f5',
                            }
                        }}
                    />
                </div>

                {/* User Switch */}
                <div className="user-switch">
                    <Button
                        variant={isSender ? "contained" : "outlined"}
                        onClick={() => setIsSender(true)}
                        sx={{
                            background: isSender ? (mode === 'light' 
                                ? 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)'
                                : 'linear-gradient(135deg, #90caf9 0%, #42a5f5 100%)') : 'transparent',
                            color: isSender ? (mode === 'light' ? '#ffffff' : '#000000') : (mode === 'light' ? '#1976d2' : '#90caf9'),
                            borderColor: mode === 'light' ? '#1976d2' : '#90caf9',
                            '&:hover': {
                                background: isSender ? (mode === 'light' 
                                    ? 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)'
                                    : 'linear-gradient(135deg, #42a5f5 0%, #90caf9 100%)') : (mode === 'light' 
                                    ? 'rgba(25, 118, 210, 0.08)' : 'rgba(144, 202, 249, 0.08)'),
                            }
                        }}
                    >
                        {offerInfo?.sender.displayName}
                    </Button>
                    <Button
                        variant={!isSender ? "contained" : "outlined"}
                        onClick={() => setIsSender(false)}
                        sx={{
                            background: !isSender ? (mode === 'light' 
                                ? 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)'
                                : 'linear-gradient(135deg, #90caf9 0%, #42a5f5 100%)') : 'transparent',
                            color: !isSender ? (mode === 'light' ? '#ffffff' : '#000000') : (mode === 'light' ? '#1976d2' : '#90caf9'),
                            borderColor: mode === 'light' ? '#1976d2' : '#90caf9',
                            '&:hover': {
                                background: !isSender ? (mode === 'light' 
                                    ? 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)'
                                    : 'linear-gradient(135deg, #42a5f5 0%, #90caf9 100%)') : (mode === 'light' 
                                    ? 'rgba(25, 118, 210, 0.08)' : 'rgba(144, 202, 249, 0.08)'),
                            }
                        }}
                    >
                        {offerInfo?.receiver.displayName}
                    </Button>
                </div>

                {/* Main Content */}
                {isSender ? (
                    <div className="user-mobile-container">
                        {/* User Info */}
                        <div className="info">
                            <Avatar src={offerInfo?.sender.profilePicture} />
                            <Typography variant="h6" sx={{ color: mode === 'light' ? '#212121' : '#ffffff' }}>
                                {offerInfo?.sender.displayName}
                            </Typography>
                            <Chip 
                                label={offerInfo?.status[0]?.status || 'Pending'} 
                                color={getStatusColor(offerInfo?.status[0]?.status)}
                                size="small"
                                sx={{ 
                                    fontWeight: 600,
                                    backgroundColor: getStatusColor(offerInfo?.status[0]?.status) === 'success' ? '#2e7d32' :
                                                   getStatusColor(offerInfo?.status[0]?.status) === 'error' ? '#d32f2f' :
                                                   getStatusColor(offerInfo?.status[0]?.status) === 'warning' ? '#ed6c02' : '#757575',
                                    color: '#ffffff'
                                }}
                            />
                        </div>

                        {/* Offer Section */}
                        <Typography variant="p" sx={{ 
                            color: mode === 'light' ? '#1976d2' : '#90caf9',
                            fontWeight: 600,
                            fontSize: '1.1rem'
                        }}>
                            Current Offer
                        </Typography>
                        <div className="sender-container">
                            {senderOffer && senderOffer.length > 0 ? (
                                senderOffer.map((product) => (
                                    <div
                                        key={product._id}
                                        onClick={() => handleSenderOfferClick(product)}
                                    >
                                        <ProductOfferCard productInfo={product} />
                                    </div>
                                ))
                            ) : (
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: '100px',
                                    color: mode === 'light' ? '#757575' : '#b0b0b0',
                                    fontStyle: 'italic'
                                }}>
                                    No products in offer yet
                                </Box>
                            )}
                        </div>

                        {/* Available Products Section */}
                        <Typography variant="p" sx={{ 
                            color: mode === 'light' ? '#1976d2' : '#90caf9',
                            fontWeight: 600,
                            fontSize: '1.1rem'
                        }}>
                            Available Products
                        </Typography>
                        <div className="sender-container">
                            {senderProducts && senderProducts.length > 0 ? (
                                senderProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        onClick={() => handleSenderProductsClick(product)}
                                    >
                                        <ProductOfferCard productInfo={product} />
                                    </div>
                                ))
                            ) : (
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: '100px',
                                    color: mode === 'light' ? '#757575' : '#b0b0b0',
                                    fontStyle: 'italic'
                                }}>
                                    No available products
                                </Box>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="user-mobile-container">
                        {/* User Info */}
                        <div className="info">
                            <Avatar src={offerInfo?.receiver.profilePicture} />
                            <Typography variant="h6" sx={{ color: mode === 'light' ? '#212121' : '#ffffff' }}>
                                {offerInfo?.receiver.displayName}
                            </Typography>
                            <Chip 
                                label={offerInfo?.status[1]?.status || 'Pending'} 
                                color={getStatusColor(offerInfo?.status[1]?.status)}
                                size="small"
                                sx={{ 
                                    fontWeight: 600,
                                    backgroundColor: getStatusColor(offerInfo?.status[1]?.status) === 'success' ? '#2e7d32' :
                                                   getStatusColor(offerInfo?.status[1]?.status) === 'error' ? '#d32f2f' :
                                                   getStatusColor(offerInfo?.status[1]?.status) === 'warning' ? '#ed6c02' : '#757575',
                                    color: '#ffffff'
                                }}
                            />
                        </div>

                        {/* Offer Section */}
                        <Typography variant="p" sx={{ 
                            color: mode === 'light' ? '#1976d2' : '#90caf9',
                            fontWeight: 600,
                            fontSize: '1.1rem'
                        }}>
                            Current Offer
                        </Typography>
                        <div className="receiver-container">
                            {receiverOffer && receiverOffer.length > 0 ? (
                                receiverOffer.map((product) => (
                                    <div
                                        key={product._id}
                                        onClick={() => handleReceiverOfferClick(product)}
                                    >
                                        <ProductOfferCard productInfo={product} />
                                    </div>
                                ))
                            ) : (
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: '100px',
                                    color: mode === 'light' ? '#757575' : '#b0b0b0',
                                    fontStyle: 'italic'
                                }}>
                                    No products in offer yet
                                </Box>
                            )}
                        </div>

                        {/* Available Products Section */}
                        <Typography variant="p" sx={{ 
                            color: mode === 'light' ? '#1976d2' : '#90caf9',
                            fontWeight: 600,
                            fontSize: '1.1rem'
                        }}>
                            Your Available Products
                        </Typography>
                        <div className="receiver-container">
                            {receiverProducts && receiverProducts.length > 0 ? (
                                receiverProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        onClick={() => handleReceiverProductsClick(product)}
                                    >
                                        <ProductOfferCard productInfo={product} />
                                    </div>
                                ))
                            ) : (
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: '100px',
                                    color: mode === 'light' ? '#757575' : '#b0b0b0',
                                    fontStyle: 'italic'
                                }}>
                                    No available products
                                </Box>
                            )}
                        </div>
                    </div>
                )}

                {/* Bottom Actions */}
                <div className="bottom-offer-container">
                    {/* Messages Section */}
                    <div className="text-container">
                        <div className="messages-container">
                            <ul>
                                {offerInfo?.conversation?.map((msg, index) => (
                                    <li key={index} style={{ color: mode === 'light' ? '#212121' : '#ffffff' }}>
                                        <strong style={{ color: mode === 'light' ? '#1976d2' : '#90caf9' }}>{msg.sender}:</strong> {msg.content}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <TextField
                            multiline
                            minRows={1}
                            maxRows={3}
                            placeholder="Enter your message here..."
                            label="Message"
                            fullWidth
                            inputRef={messageRef}
                            sx={{ 
                                maxWidth: 500,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: mode === 'light' ? '#e0e0e0' : '#424242',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: mode === 'light' ? '#1976d2' : '#90caf9',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: mode === 'light' ? '#1976d2' : '#90caf9',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: mode === 'light' ? '#757575' : '#b0b0b0',
                                },
                                '& .MuiInputBase-input': {
                                    color: mode === 'light' ? '#212121' : '#ffffff',
                                },
                            }}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="buttons-container">
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={() => handleOfferUpdate("Pending")}
                            disabled={offerEnded}
                            sx={{
                                background: '#ed6c02',
                                '&:hover': {
                                    background: '#f57c00',
                                },
                                '&:disabled': {
                                    background: '#ccc',
                                }
                            }}
                        >
                            Update Offer
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleOfferUpdate("Accepted")}
                            disabled={offerEnded}
                            sx={{
                                background: '#2e7d32',
                                '&:hover': {
                                    background: '#388e3c',
                                },
                                '&:disabled': {
                                    background: '#ccc',
                                }
                            }}
                        >
                            Accept Offer
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleOfferUpdate("Rejected")}
                            disabled={offerEnded}
                            sx={{
                                background: '#d32f2f',
                                '&:hover': {
                                    background: '#c62828',
                                },
                                '&:disabled': {
                                    background: '#ccc',
                                }
                            }}
                        >
                            Reject Offer
                        </Button>
                    </div>
                </div>

                {msg && <BasicModal msg={msg} setMsg={setMsg} />}
            </div>
        </Slide>
    );
}
