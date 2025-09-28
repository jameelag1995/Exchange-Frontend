import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import SearchIcon from "@mui/icons-material/Search";
import { axiosProductsInstance } from "../../utils/utils";
import BasicModal from "../../components/BasicModal/BasicModal";
import ProductCard from "../../components/ProductCard/ProductCard";
import {
    Box,
    Container,
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
    const { mode } = useTheme();
    const [allProducts, setAllProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const navigate = useNavigate();
    const [msg, setMsg] = useState(null);
    const [priceValue, setPriceValue] = useState([1, 1000]);

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
                const clamped = Math.min(newValue[0], 1000 - minDistance);
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
                    message: "Try Searching for Something Else.",
                });
        }, 1500);

        return () => {
            clearTimeout(timeout);
            setMsg(null);
        };
    }, [displayedProducts]);

    return (
        <Slide direction="up" in style={{ transitionDelay: 800 }}>
            <Container maxWidth="xl" className="Dashboard Page">
                {/* Search Bar */}
                <Paper
                    component="form"
                    sx={{
                        p: "2px 4px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        maxWidth: "600px",
                        mx: "auto",
                        mb: 3,
                        mt: 2,
                        border: mode === 'light' ? '2px solid #e0e0e0' : '2px solid #424242',
                        '&:hover': {
                            border: mode === 'light' ? '2px solid #1976d2' : '2px solid #90caf9',
                            boxShadow: mode === 'light' 
                                ? '0 4px 20px rgba(25, 118, 210, 0.15)' 
                                : '0 4px 20px rgba(144, 202, 249, 0.15)',
                        },
                        '&:focus-within': {
                            border: mode === 'light' ? '2px solid #1976d2' : '2px solid #90caf9',
                            boxShadow: mode === 'light' 
                                ? '0 4px 20px rgba(25, 118, 210, 0.2)' 
                                : '0 4px 20px rgba(144, 202, 249, 0.2)',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    <InputBase
                        sx={{ 
                            ml: 1, 
                            flex: 1,
                            '& input': {
                                color: mode === 'light' ? '#212121' : '#ffffff',
                                '&::placeholder': {
                                    color: mode === 'light' ? '#757575' : '#b0b0b0',
                                    opacity: 1,
                                },
                            },
                        }}
                        placeholder="Search For Products"
                        inputProps={{ "aria-label": "search for products" }}
                        onChange={handleSearch}
                    />
                    <Divider
                        sx={{ 
                            height: 28, 
                            m: 0.5,
                            backgroundColor: mode === 'light' ? '#e0e0e0' : '#424242',
                        }}
                        orientation="vertical"
                    />
                    <IconButton
                        type="button"
                        sx={{ 
                            p: "10px",
                            color: mode === 'light' ? '#1976d2' : '#90caf9',
                            '&:hover': {
                                backgroundColor: mode === 'light' 
                                    ? 'rgba(25, 118, 210, 0.08)' 
                                    : 'rgba(144, 202, 249, 0.08)',
                            },
                        }}
                        aria-label="search"
                    >
                        <SearchIcon />
                    </IconButton>
                </Paper>

                {/* Price Range Filter */}
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "800px",
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        mx: "auto",
                        mb: 4,
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
                        max={1000}
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

                {/* Products Grid */}
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
            </Container>
        </Slide>
    );
}
