import { Avatar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { axiosReviewsInstance, axiosUsersInstance } from "../../utils/utils";
import { jwtDecode } from "jwt-decode";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { useParams } from "react-router-dom";
import BasicModal from "../../components/BasicModal/BasicModal";

export default function Reviews() {
    const { accessToken } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [msg, setMsg] = useState("");
    const params = useParams();
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
        } catch (error) {
            setMsg(error.response.data);
        }
    };
    useEffect(() => {
        if (accessToken) fetchReviews();
    }, [accessToken]);

    return (
        <div className="Reviews Page">
            <Avatar
                src={userInfo?.profilePicture}
                sx={{ width: "100px", height: "100px", boxShadow: "0 0 4px" }}
            />
            <Typography variant="h4">{userInfo?.displayName}</Typography>
            <Typography variant="h3">Reviews</Typography>
            {reviews.map((review) => (
                <ReviewCard reviewInfo={review} key={review._id} />
            ))}
            <BasicModal msg={msg} setMsg={setMsg} />
        </div>
    );
}
