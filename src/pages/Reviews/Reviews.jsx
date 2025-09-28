import { Avatar, Rating, Slide, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { axiosReviewsInstance, axiosUsersInstance } from "../../utils/utils";
import { jwtDecode } from "jwt-decode";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { useNavigate, useParams } from "react-router-dom";
import BasicModal from "../../components/BasicModal/BasicModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Reviews.css";

export default function Reviews() {
    const { accessToken } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [msg, setMsg] = useState("");
    const [rating, setRating] = useState(2);
    const params = useParams();
    const navigate = useNavigate();
    const fetchReviews = async () => {
        try {
            const decoded = jwtDecode(accessToken);
            const result = await axiosReviewsInstance.get(`/${params.userId}`, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
            const userResult = await axiosUsersInstance.get(
                `/${params.userId}`,
                {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }
            );

            setUserInfo(userResult.data);
            setReviews(result.data);
            let avg = 0;
            for (let rev of result.data) {
                avg += parseInt(rev.rating) / result.data.length;
            }
            setRating(avg.toFixed(2));
        } catch (error) {
            setMsg(error.response.data);
        }
    };
    useEffect(() => {
        if (accessToken) fetchReviews();
    }, [accessToken]);

    return (
        <Slide direction="up" in style={{ transitionDelay: 800 }}>
            <div className="Reviews Page">
                <div className="back-btn-container">
                    <ArrowBackIcon
                        sx={{
                            position: "relative",
                            zIndex: "10",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate(-1)}
                    />
                </div>
                <Avatar
                    src={userInfo?.profilePicture}
                    sx={{
                        width: "100px",
                        height: "100px",
                        boxShadow: "0 0 4px",
                    }}
                />
                <Typography variant="h4">{userInfo?.displayName}</Typography>
                <div className="rating-review-container">
                    <div className="rating">
                        <Rating value={rating} precision={0.5} readOnly />
                        <Typography variant="h6">{rating}</Typography>
                    </div>
                    <Typography variant="h6">
                        ({reviews?.length} reviews)
                    </Typography>
                </div>
                <Typography variant="h3">Reviews</Typography>
                {reviews.map((review) => (
                    <ReviewCard reviewInfo={review} key={review._id} />
                ))}
                {msg && <BasicModal msg={msg} setMsg={setMsg} />}
            </div>
        </Slide>
    );
}
