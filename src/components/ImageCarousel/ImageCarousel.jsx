import React, { useState } from "react";
import "./ImageCarousel.css"; // Import your CSS file for styling
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { Button } from "@mui/material";

const ImageCarousel = ({ images = ["/public/vite.svg"] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images?.length) % images?.length
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images?.length);
    };

    return (
        <div className="image-carousel">
            <div className="carousel-container">
                <img src={images[currentIndex]} alt={`Image ${currentIndex}`} />
            </div>
            {images.length > 1 && (
                <div className="controls">
                    <Button variant="contained" onClick={handlePrev}>
                        Previous
                    </Button>
                    <Button variant="contained" onClick={handleNext}>
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ImageCarousel;
