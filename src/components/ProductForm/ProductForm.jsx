import { FormControl, Paper, TextField, Typography } from "@mui/material";

import { Close } from "@mui/icons-material";
import { useState } from "react";
export default function ProductForm({ editingProduct, setEditingProduct }) {
    return (
        <Paper
            sx={{
                zIndex: 3,
                width: 1,
                maxWidth: "600px",
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                mt: "60px",
                p: "60px 16px 60px 16px",
            }}
        >
            <Close
                onClick={() => setEditingProduct(false)}
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
                />
                
            </FormControl>
        </Paper>
    );
}
