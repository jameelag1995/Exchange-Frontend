import { Button, Rating, Slide, TextField, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Review.css";
import { axiosReviewsInstance } from "../../utils/utils";
export default function Review({ offerInfo, setMsg, msg }) {
    const { accessToken } = useAuth();
    let decoded;
    if (accessToken) decoded = jwtDecode(accessToken);
    const [receiver, setReceiver] = useState({});
    const [sender, setSender] = useState({});
    const [ratingValue, setRatingValue] = useState(2);
    const reviewContentRef = useRef();
    const submitReview = async () => {
        try {
            let reqBody;
            if (reviewContentRef.current.value.length > 0) {
                reqBody = {
                    sender: sender._id,
                    receiver: receiver._id,
                    content: reviewContentRef.current.value,
                    rating: ratingValue,
                    offer: offerInfo._id,
                };
            }
            const result = await axiosReviewsInstance.post("/create", reqBody, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
            console.log(result.data);
            setMsg({ title: "Success", message: "Review Submitted" });
        } catch (error) {
            setMsg(error.response.data);
        }
    };
    useEffect(() => {
        if (decoded._id === offerInfo?.sender?._id) {
            setReceiver(offerInfo?.receiver);
            setSender(offerInfo?.sender);
        } else {
            setReceiver(offerInfo?.sender);
            setSender(offerInfo?.receiver);
        }
    }, [accessToken]);
    return (
        <Slide direction="right" in mountOnEnter unmountOnExit>
            <div className="Review">
                <Typography variant="h5">
                    Write a Review to {receiver.displayName}
                </Typography>
                <div className="rating">
                    <Typography variant="h5">Rating:</Typography>
                    <Rating
                        name="simple-controlled"
                        precision={0.5}
                        value={ratingValue}
                        onChange={(event, newValue) => {
                            setRatingValue(newValue);
                        }}
                    />
                </div>
                <TextField
                    rows={4}
                    multiline
                    label="Your Review"
                    inputRef={reviewContentRef}
                    sx={{ width: "250px" }}
                />
                <Button variant="contained" onClick={submitReview}>
                    Submit Review
                </Button>
            </div>
        </Slide>
    );
}
