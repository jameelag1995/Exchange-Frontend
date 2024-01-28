import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import SearchIcon from "@mui/icons-material/Search";
import { axiosProductsInstance } from "../../utils/utils";
import BasicModal from "../../components/BasicModal/BasicModal";
import ProductCard from "../../components/ProductCard/ProductCard";
import {
    Box,
    Divider,
    IconButton,
    InputBase,
    Paper,
    Slide,
    Slider,
    Typography,
} from "@mui/material";
export default function Dashboard() {
    const { accessToken } = useAuth();
    const [allProducts, setAllProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const navigate = useNavigate();
    const [msg, setMsg] = useState(null);
    const [priceValue, setPriceValue] = useState([1, 10000]);

    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase();

        const filteredProducts = allProducts.filter(
            (product) =>
                product.title.toLowerCase().includes(searchQuery) ||
                product.description.toLowerCase().includes(searchQuery) ||
                product.canBeTradedFor.includes(searchQuery) ||
                product.category.toLowerCase().includes(searchQuery) ||
                product.subCategory.toLowerCase().includes(searchQuery) ||
                product.color.toLowerCase().includes(searchQuery)
        );
        setDisplayedProducts(filteredProducts);
    };
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
                setAllProducts(result.data);
                setDisplayedProducts(result.data);
            } catch (error) {
                setMsg(error.response.data);
            }
        }
    };
    function valuetext(value) {
        return `${value}/$`;
    }
    const handleChange = (event, newValue, activeThumb) => {
        const minDistance = 100;
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 10000 - minDistance);
                setPriceValue([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setPriceValue([clamped - minDistance, clamped]);
            }
        } else {
            setPriceValue(newValue);
        }

        const [min, max] = newValue;
        const filteredProducts = allProducts.filter((product) => {
            // console.log(max);
            // console.log(parseInt(product.estimatedValue) < max);

            return (
                parseInt(product.estimatedValue) < max &&
                parseInt(product.estimatedValue) > min
            );
        });

        setDisplayedProducts(filteredProducts);
    };
    useEffect(() => {
        if (!accessToken && !localStorage.getItem("token")) {
            navigate("/auth/login");
            return;
        }

        if (accessToken) fetchData();
    }, [accessToken]);
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (displayedProducts.length === 0)
                setMsg({
                    title: "No Products Were Found",
                    message: "Try Searching for Something Else",
                });
        }, 1500);

        return () => clearTimeout(timeout);
    }, [displayedProducts]);

    return (
        <Slide direction="up" in style={{ transitionDelay: 800 }}>
            <div className="Dashboard Page">
                <Paper
                    component="form"
                    sx={{
                        p: "2px 4px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: 1,
                        maxWidth: "600px",
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search For Products"
                        inputProps={{ "aria-label": "search for products" }}
                        // inputRef={searchRef}
                        onChange={handleSearch}
                    />
                    <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                    />
                    <IconButton
                        // onClick={handleSearch}
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                    >
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Box
                    sx={{
                        width: 1,
                        maxWidth: "800px",
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <Typography variant="h6">Price Range:</Typography>
                    <Typography variant="h6" sx={{ m: 2, textWrap: "nowrap" }}>
                        min:{priceValue[0]}$
                    </Typography>
                    <Slider
                        sx={{
                            maxWidth: 300,
                            minWidth: 150,
                        }}
                        min={1}
                        max={10000}
                        disableSwap
                        getAriaLabel={() => "Price range"}
                        value={priceValue}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                    <Typography variant="h6" sx={{ m: 2, textWrap: "nowrap" }}>
                        max :{priceValue[1]}$
                    </Typography>
                </Box>
                <div className="all-products-container">
                    {displayedProducts.length > 0 &&
                        displayedProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                productInfo={product}
                            />
                        ))}
                </div>
                {msg && <BasicModal setMsg={setMsg} msg={msg} />}
            </div>
        </Slide>
    );
}
