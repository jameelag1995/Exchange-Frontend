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
export default function ProductForm({
    productToEdit,
    addingProduct,
    setEditingProduct,
    setAddingProduct,
    setMsg,
}) {
    const [images, setImages] = useState([]);
    const [productType, setProductType] = useState("");
    const titleRef = useRef();
    const priceRef = useRef();
    const categoryRef = useRef();
    const descriptionRef = useRef();
    const canBeTradedForRef = useRef();
    const colorRef = useRef();
    const { accessToken } = useAuth();

    const handleTypeChange = (event) => {
        setProductType(event.target.value);
    };
    const setFormData = () => {
        const formData = new FormData();
        formData.append("title", titleRef.current.value);
        if (images.length > 0) formData.append("pictures", images);
        formData.append("type", productType);
        formData.append("estimatedValue", priceRef.current.value);
        formData.append("color", colorRef.current.value);
        formData.append("category", categoryRef.current.value);
        formData.append("description", descriptionRef.current.value);

        formData.append("canBeTradedFor", canBeTradedForRef.current.value);
        console.log(canBeTradedForRef.current.value.split(","));
        return formData;
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
            setMsg({ title: "Success", message: "Product Added Successfully" });
        } catch (error) {
            setMsg(error.response.data);
        }
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
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Category"
                        fullWidth
                        required
                        defaultValue={productToEdit?.category}
                        inputRef={categoryRef}
                    />
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
                        fullWidth
                        required
                        defaultValue={productToEdit?.estimatedValue}
                        inputRef={priceRef}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Type
                        </InputLabel>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Type"
                            value={productToEdit?.type}
                            onChange={handleTypeChange}
                        >
                            <MenuItem value="Goods">Goods</MenuItem>
                            <MenuItem value="Service">Service</MenuItem>
                        </Select>
                    </FormControl>
                </div>
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
