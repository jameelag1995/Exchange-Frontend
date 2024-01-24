import { Button } from "@mui/material";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
export default function UploadWidget({ images, setImages }) {
    const [formData, setFormData] = useState({});

    function handleOpenWidget() {
        let myWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: import.meta.env.VITE_CLOUDINARY_CLOUDNAME,
                uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOADPRESET,
                maxFileSize: 10 * 1024 * 1024,
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log("Done! Here is the image info: ", result.info);
                    const secureUrl = result.info.secure_url;
                    setImages((prev) => [...prev, secureUrl]);
                }
            }
        );
        myWidget.open();
    }
    return (
        <div>
            <Button
                onClick={handleOpenWidget}
                variant="outlined"
                sx={{ display: "flex", gap: "8px" }}
            >
                Upload Image <CloudUploadIcon />
            </Button>
        </div>
    );
}
