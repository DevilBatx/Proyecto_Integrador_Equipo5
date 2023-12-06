import React, { useState } from 'react';

const Gallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleClick = (index) => {
        setSelectedImage(index);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    return (
        <div className="grid gap-4">
            {images && images.length > 0 && (
                <div>
                    <img
                        className="h-auto max-w-full rounded-lg cursor-pointer"
                        src={images[0].imageUrl}
                        alt={images[0].altText}
                        onClick={() => handleClick(0)}
                        style={{ maxWidth: '80%', margin: '0 auto' }}  // Estilos para la primera imagen
                    />
                </div>
            )}
            <div className="grid grid-cols-5 gap-4">
                {images &&
                    images.slice(1, 6).map((image, index) => (
                        <div key={index}>
                            <img
                                className="h-auto max-w-full rounded-lg cursor-pointer"
                                src={image.imageUrl}
                                alt={image.altText}
                                onClick={() => handleClick(index + 1)}
                            />
                        </div>
                    ))}
            </div>
            {selectedImage !== null && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="relative max-w-screen-md w-full max-h-screen-md">
                        <span
                            className="absolute top-2 right-2 cursor-pointer text-black text-2xl"
                            onClick={handleClose}
                        >
                            &times;
                        </span>
                        <img
                            className="max-h-full max-w-full rounded-lg object-contain"
                            src={images[selectedImage].imageUrl}
                            alt={images[selectedImage].altText}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;