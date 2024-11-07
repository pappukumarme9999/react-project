// src/components/ImageUploader/ImageUploader.js
import React, { useState } from 'react';
import { convertImageToBase64 } from '../../utils/imageToBase64';

function ImageUploader() {
  const [base64Image, setBase64Image] = useState("");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertImageToBase64(file);
      setBase64Image(base64);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {base64Image && (
        <div>
          <h3>Base64 Encoded Image:</h3>
          <img src={base64Image} alt="Uploaded Preview" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
