import React, { useState } from 'react';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);

            fetch('localhost:3001/uploadimage', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Image uploaded:', data);
                    // Handle success or do something with the response
                })
                .catch((error) => {
                    console.error('Error uploading image:', error);
                    // Handle error
                });
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileInputChange} />
            <button onClick={handleUpload}>Upload Image</button>
            {previewImage && (
                <div style={{ border: '1px solid #ccc', marginTop: '20px', padding: '10px' }}>
                    <h2>Preview</h2>
                    <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
