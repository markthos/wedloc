// Upload page

import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { useEffect, useState } from "react";
import { fill } from "@cloudinary/url-gen/actions/resize";

//!this entire page is currently not working

export default function Upload({ cloudName }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", "your_cloudinary_upload_preset");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.secure_url) {
            const cloudinaryUrl = data.secure_url;
            // Handle success, reset form, etc.
          } else {
            // Handle Cloudinary API response error
          }
        } else {
          // Handle HTTP error
        }
      } catch (error) {
        // Handle network or other errors
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    // Generate a URL for the selected image
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageURL(imageUrl);
    }
  };
  return (
    <div className="body">
      <section className="contentSection">
        <h1>Upload a photo or video!</h1>
        <input
          type="file"
          id="fileInput"
          accept="image/*, video/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" htmlFor="fileInput">
          Choose Media
        </label>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover-bg-blue-700"
          onClick={handleImageUpload}
        >
          Submit
        </button>
        {imageURL && <img src={imageURL} alt="Selected Media" />}
      </section>
    </div>
  );
}
