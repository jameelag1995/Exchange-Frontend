import {
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Close } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { axiosProductsInstance } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import UploadWidget from "../UploadWidget/UploadWidget";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import ProductCategorySelect from "../ProductCategorySelect/ProductCategorySelect";
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

    const handleTypeChange = (event) => {
        setProductType(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
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
        console.log(canBeTradedForRef.current.value.split(","));
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
            const result = await axiosProductsInstance.put(
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
                message: "Product Edited Successfully",
            });
        } catch (error) {
            setMsg(error.response.data);
        }
    };
    const handleAddProduct = async () => {
        const formData = setFormData();
        try {
            const result = await axiosProductsInstance.post(
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
            setMsg({ title: "Success", message: "Product Added Successfully" });
        } catch (error) {
            setMsg(error.response.data);
        }
    };
    const categories = [
        "Electronics",
        "Clothing",
        "Books",
        "Jewelry",
        "Home & Furniture",
        "Beauty",
        "Sports & Outdoors",
        "Toys & Games",
        "Automotive",
        "Other",
        // Add more categories as needed
    ];
    const subcategories = {
        Electronics: [
            "Smartphones",
            "Smart Watch",
            "Laptops",
            "Tablets",
            "Audio",
            "PC",
            "Hardware",
            "Accessories",
        ],
        Clothing: ["Men's", "Women's", "Kids"],
        Books: ["Fiction", "Non-Fiction", "Mystery", "Science Fiction"],
        Jewelry: ["Necklaces", "Bracelets", "Earrings", "Rings", "Watch"],
        "Home & Furniture": ["Furniture", "Bedding", "Decor"],
        Beauty: ["Skincare", "Makeup", "Haircare"],
        "Sports & Outdoors": ["Outdoor Gear", "Athletic Clothing", "Footwear"],
        "Toys & Games": ["Action Figures", "Board Games", "Puzzles"],
        Automotive: ["Car Accessories", "Tools", "Maintenance"],
        Other: ["Miscellaneous"],
        // Add more subcategories as needed
    };

    return (
        <Paper
            sx={{
                zIndex: 3,
                width: 1,
                maxWidth: "800px",
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                p: "8px",
                borderRadius: "6px",
                boxShadow: "0 0 4px",
            }}
        >
            <Close
                onClick={() => {
                    setAddingProduct(false);
                    setEditingProduct(false);
                    resetForm();
                }}
                sx={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                }}
            />
            <Typography variant="h5">Add New Product</Typography>
            <FormControl
                sx={{
                    width: 1,
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                }}
            >
                <TextField
                    id="outlined-multiline-flexible"
                    label="Title"
                    multiline
                    maxRows={4}
                    fullWidth
                    required
                    defaultValue={productToEdit?.title}
                    inputRef={titleRef}
                />

                <div
                    className="product-type-price"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: "16px",
                        width: "100%",
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" required>
                            Category
                        </InputLabel>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" required>
                            Sub-Category
                        </InputLabel>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Sub-Category"
                            value={selectedSubCategory}
                            onChange={handleSubCategoryChange}
                        >
                            {selectedCategory &&
                                subcategories[selectedCategory].map(
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
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Color"
                        fullWidth
                        defaultValue={productToEdit?.color}
                        inputRef={colorRef}
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Estimated Value"
                        type="number"
                        fullWidth
                        required
                        defaultValue={productToEdit?.estimatedValue}
                        inputRef={priceRef}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" required>
                            Type
                        </InputLabel>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Type"
                            value={productType}
                            onChange={handleTypeChange}
                        >
                            <MenuItem value="Goods">Goods</MenuItem>
                            <MenuItem value="Service">Service</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Location"
                    multiline
                    maxRows={1}
                    fullWidth
                    required
                    defaultValue={productToEdit?.location}
                    inputRef={locationRef}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    defaultValue={productToEdit?.description}
                    inputRef={descriptionRef}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Can Be Traded For"
                    multiline
                    rows={2}
                    fullWidth
                    required
                    placeholder="include the sub category and separate with commas example (iphone 10,smartphones,lenovo,laptop)"
                    defaultValue={productToEdit?.canBeTradedFor}
                    inputRef={canBeTradedForRef}
                />
            </FormControl>
            <UploadWidget images={image} setImages={setImages} />
            {addingProduct ? (
                <Button variant="contained" onClick={handleAddProduct}>
                    Add Product
                </Button>
            ) : (
                <Button variant="contained" onClick={handleEditProduct}>
                    Edit Product
                </Button>
            )}
        </Paper>
    );
}
