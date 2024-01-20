import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Search from "../../components/Search/Search";
import "./Dashboard.css";
import { axiosProductsInstance } from "../../utils/utils";
import BasicModal from "../../components/BasicModal/BasicModal";
import ProductCard from "../../components/ProductCard/ProductCard";
export default function Dashboard() {
    const { accessToken } = useAuth();
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const navigate = useNavigate();
    const [msg, setMsg] = useState(null);
    const fetchData = async () => {
        if (accessToken) {
            try {
                const result = await axiosProductsInstance.get(
                    "/all-products",
                    {
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    }
                );
                setDisplayedProducts(result.data);
            } catch (error) {
                setMsg(error.response.data);
            }
        }
    };
    useEffect(() => {
        if (!accessToken && !localStorage.getItem("token")) {
            navigate("/login");
            return;
        }
        

        fetchData();
    }, []);
    return (
        <div className="Dashboard Page">
            <Search
                setDisplayedProducts={setDisplayedProducts}
                setMsg={setMsg}
            />
            <div className="all-products-container">
                {displayedProducts.length > 0 &&
                    displayedProducts.map((product) => (
                        <ProductCard key={product._id} productInfo={product} />
                    ))}
            </div>
            {msg && <BasicModal setMsg={setMsg} msg={msg} />}
        </div>
    );
}
