import React, { useState } from 'react';

const Gallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [visible, setVisible] = useState(false)
    const [showModalimg, setShowModalimg] = useState(false)
    const [saveImg, setSaveimg] = useState("")

    const handleClick = (index) => {
        setSelectedImage(index);
        setShowModalimg(true)
        setSaveimg(images[index].imageUrl)
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    return (
        <div className="grid gap-4 w-96 w-96 object-cover rounded-md ">
            {images && images.length > 0 && (
                <div>
                    <img
                        className="h-auto max-w-full rounded-lg cursor-pointer col-span-2 row-span-2 border border-orange-300 "
                        src={images[0].imageUrl}
                        alt={images[0].altText}
                        onClick={() => handleClick(0)}
                        style={{ maxWidth: '100%', margin: '0 auto' }}  // Estilos para la primera imagen
                    />
                </div>
            )}
            <div className="grid grid-cols-5 gap-4 ">
                {images &&
                    images.slice(1, 6).map((image, index) => (
                        <div key={index}>
                            <img
                                className="h-auto max-w-full rounded-lg cursor-pointer col-span-2 row-span-2 border border-orange-300 rounded-md "
                                src={image.imageUrl}
                                alt={image.altText}
                                onClick={() => handleClick(index + 1)}
                            />
                        </div>
                    ))}
            </div>
            {showModalimg && (
                <div className=" z-50 flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-90">
                    <div className="bg-white rounded-lg w-96">
                        <form className="w-full">
                            <div className="flex flex-col items-start p-4">
                                <div className='flex items-center w-full border-b pb-4'>
                                    <button
                                        className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer "
                                        onClick={() => setShowModalimg(false)}>
                                        <span>✖</span>
                                    </button>
                                </div>
                                <div>
                                    <img src={saveImg} alt="" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
            }
        </div>
    );
};

export default Gallery;