import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
    Box,
    Grid,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useRef, useState } from "react";
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import UploadWidget from "../UploadWidget/UploadWidget";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { PRODUCT_CATEGORIES, PRODUCT_SUBCATEGORIES } from "../../constants";

export default function ProductForm({
    productToEdit,
    addingProduct,
    setEditingProduct,
    setAddingProduct,
    setMsg,
}) {
    const [images, setImages] = useState([]);
    const [productType, setProductType] = useState(productToEdit?.type || "");
    const [selectedCategory, setSelectedCategory] = useState(
        productToEdit?.category || ""
    );
    const [selectedSubCategory, setSelectedSubCategory] = useState(
        productToEdit?.subCategory || ""
    );
    const titleRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();
    const canBeTradedForRef = useRef();
    const locationRef = useRef();
    const colorRef = useRef();
    const { accessToken } = useAuth();
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleTypeChange = (event) => {
        setProductType(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setSelectedSubCategory(""); // Reset subcategory when category changes
    };
    
    const handleSubCategoryChange = (event) => {
        setSelectedSubCategory(event.target.value);
    };

    const setFormData = () => {
        const formData = new FormData();
        formData.append("title", titleRef.current.value);
        formData.append("location", locationRef.current.value);
        if (images.length > 0) formData.append("pictures", images);
        formData.append("type", productType);
        formData.append("estimatedValue", priceRef.current.value);
        formData.append("color", colorRef.current.value);
        formData.append("category", selectedCategory);
        formData.append("subCategory", selectedSubCategory);
        formData.append("description", descriptionRef.current.value);
        formData.append(
            "canBeTradedFor",
            canBeTradedForRef.current.value.split(",")
        );
        return formData;
    };
    
    const resetForm = () => {
        titleRef.current.value = "";
        locationRef.current.value = "";
        setImages([]);
        setProductType("");
        priceRef.current.value = 0;
        colorRef.current.value = "";
        setSelectedCategory("");
        setSelectedSubCategory("");
        descriptionRef.current.value = "";
        canBeTradedForRef.current.value = "";
    };
    
    const handleEditProduct = async () => {
        const formData = setFormData();
        try {
            await api.products.put(
                `/${productToEdit?._id}`,
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }
            );
            setEditingProduct(false);
            resetForm();
            setMsg({
                title: "Success",
                message: "Product Edited Successfully.",
            });
        } catch (error) {
            setMsg(error.response.data);
        }
    };
    
    const handleAddProduct = async () => {
        const formData = setFormData();
        try {
            await api.products.post(
                "/create",
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }
            );
            setAddingProduct(false);
            resetForm();
            setMsg({ title: "Success", message: "Product Added Successfully." });
        } catch (error) {
            setMsg(error.response.data);
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                p: { xs: 1, sm: 2, md: 3 },
                overflow: 'auto'
            }}
        >
            <Paper
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: { xs: '100%', sm: '90%', md: '800px', lg: '900px' },
                    width: '100%',
                    maxHeight: { xs: '95vh', md: '90vh' },
                    overflow: 'auto',
                    borderRadius: { xs: 2, md: 3 },
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    p: { xs: 2, sm: 3, md: 4 },
                    gap: 2,
                    animation: 'slideIn 0.3s ease-out',
                    '@keyframes slideIn': {
                        from: {
                            opacity: 0,
                            transform: 'translateY(-20px) scale(0.95)',
                        },
                        to: {
                            opacity: 1,
                            transform: 'translateY(0) scale(1)',
                        },
                    },
                }}
            >
                <Close
                    onClick={() => {
                        setAddingProduct(false);
                        setEditingProduct(false);
                        resetForm();
                    }}
                    sx={{
                        position: 'absolute',
                        right: { xs: 8, md: 16 },
                        top: { xs: 8, md: 16 },
                        cursor: 'pointer',
                        color: 'text.secondary',
                        '&:hover': {
                            color: 'error.main',
                        },
                        zIndex: 1,
                    }}
                />
                
                <Typography 
                    variant={isMobile ? "h6" : "h5"} 
                    sx={{ 
                        textAlign: 'center',
                        mb: 2,
                        fontWeight: 600,
                        color: 'text.primary'
                    }}
                >
                    {productToEdit ? 'Edit Product' : 'Add New Product'}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Title Field */}
                    <TextField
                        label="Title"
                        multiline
                        maxRows={4}
                        fullWidth
                        required
                        defaultValue={productToEdit?.title}
                        inputRef={titleRef}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />

                    {/* Category, Sub-Category, Color, Value, Type Row */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                                <InputLabel required>Category</InputLabel>
                                <Select
                                    label="Category"
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    sx={{ borderRadius: 2 }}
                                >
                                    {PRODUCT_CATEGORIES.map((category, index) => (
                                        <MenuItem key={index} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                                <InputLabel required>Sub-Category</InputLabel>
                                <Select
                                    label="Sub-Category"
                                    value={selectedSubCategory}
                                    onChange={handleSubCategoryChange}
                                    sx={{ borderRadius: 2 }}
                                    disabled={!selectedCategory}
                                >
                                    {selectedCategory &&
                                        PRODUCT_SUBCATEGORIES[selectedCategory]?.map(
                                            (subCategory, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={subCategory}
                                                >
                                                    {subCategory}
                                                </MenuItem>
                                            )
                                        )}
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Color"
                                fullWidth
                                defaultValue={productToEdit?.color}
                                inputRef={colorRef}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    },
                                }}
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Estimated Value"
                                type="number"
                                fullWidth
                                required
                                defaultValue={productToEdit?.estimatedValue}
                                inputRef={priceRef}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    },
                                }}
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                                <InputLabel required>Type</InputLabel>
                                <Select
                                    label="Type"
                                    value={productType}
                                    onChange={handleTypeChange}
                                    sx={{ borderRadius: 2 }}
                                >
                                    <MenuItem value="Goods">Goods</MenuItem>
                                    <MenuItem value="Service">Service</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Location Field */}
                    <TextField
                        label="Location"
                        multiline
                        maxRows={1}
                        fullWidth
                        required
                        defaultValue={productToEdit?.location}
                        inputRef={locationRef}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />

                    {/* Description Field */}
                    <TextField
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        required
                        defaultValue={productToEdit?.description}
                        inputRef={descriptionRef}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />

                    {/* Can Be Traded For Field */}
                    <TextField
                        label="Can Be Traded For"
                        multiline
                        rows={2}
                        fullWidth
                        required
                        placeholder="Include the sub category and separate with commas example (iphone 10,smartphones,lenovo,laptop)"
                        defaultValue={productToEdit?.canBeTradedFor}
                        inputRef={canBeTradedForRef}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />

                    {/* Upload Widget */}
                    <Box sx={{ 
                        border: '2px dashed',
                        borderColor: 'divider',
                        borderRadius: 2,
                        p: 2,
                        textAlign: 'center',
                        backgroundColor: 'grey.50'
                    }}>
                        <UploadWidget images={image} setImages={setImages} />
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        justifyContent: 'flex-end',
                        flexDirection: { xs: 'column', sm: 'row' },
                        mt: 2
                    }}>
                        <Button 
                            variant="outlined" 
                            onClick={() => {
                                setAddingProduct(false);
                                setEditingProduct(false);
                                resetForm();
                            }}
                            sx={{ 
                                minWidth: { xs: '100%', sm: '120px' },
                                borderRadius: 2
                            }}
                        >
                            Cancel
                        </Button>
                        {addingProduct ? (
                            <Button 
                                variant="contained" 
                                onClick={handleAddProduct}
                                sx={{ 
                                    minWidth: { xs: '100%', sm: '120px' },
                                    borderRadius: 2
                                }}
                            >
                                Add Product
                            </Button>
                        ) : (
                            <Button 
                                variant="contained" 
                                onClick={handleEditProduct}
                                sx={{ 
                                    minWidth: { xs: '100%', sm: '120px' },
                                    borderRadius: 2
                                }}
                            >
                                Edit Product
                            </Button>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
