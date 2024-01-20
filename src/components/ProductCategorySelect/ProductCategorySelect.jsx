import React, { useState } from "react";
import {
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Menu,
    Paper,
} from "@mui/material";

const ProductCategorySelect = ({ selectedCategory, setSelectedCategory }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        handleCloseMenu();
    };

    const categories = [
        "Electronics",
        "Clothing",
        "Books",
        "Home & Furniture",
        "Beauty",
        "Sports & Outdoors",
        "Toys & Games",
        "Automotive",
        // Add more categories as needed
    ];

    return (
        <FormControl fullWidth>
            <InputLabel id="product-category-label">
                Product Category
            </InputLabel>
            <Select
                labelId="product-category-label"
                id="product-category-select"
                value={selectedCategory}
                label="Product Category"
                onOpen={handleOpenMenu}
                onClose={handleCloseMenu}
            >
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    PaperComponent={(props) => (
                        <Paper
                            style={{ maxHeight: "200px", overflowY: "auto" }}
                            {...props}
                        />
                    )}
                >
                    {categories.map((category, index) => (
                        <MenuItem
                            key={index}
                            onClick={() => handleCategorySelect(category)}
                            value={category}
                        >
                            {category}
                        </MenuItem>
                    ))}
                </Menu>
            </Select>
        </FormControl>
    );
};

export default ProductCategorySelect;
