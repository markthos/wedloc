import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_IMAGE } from "../../utils/mutations";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Upload({ cloudName }) {
  const { eventId } = useParams();
  const [image, setImage] = useState(null);
  const [dataURL, setDataURL] = useState("");

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const saveFolder = `wedloc/${eventId}`;

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
        folder: saveFolder,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setDataURL(result.info.url);
        }
      },
    ).open();
  }, []);

  

  const url = dataURL; //! This is the image URL to save to the database

  return (
    <main className="min-h-screen bg-main_bg">
      <section className="container m-auto">
        {dataURL && <img src={dataURL} alt="Uploaded" />}
      </section>
    </main>
  );
}

/**?
 * 
 * 
 * 
 * 
 *   const [uploadImage] = useMutation(UPLOAD_IMAGE);
  const [name, setName] = useState(localStorage.getItem("name") || "");
 * 
 *   const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("file", image);
    setImage(formData);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    try {
      const data = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`,
        image,
      );
      console.log(data.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
 * 
 *         <form>
          <input
            type="file"
            id="fileInput"
            accept="image/*, video/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            htmlFor="fileInput"
          >
            Choose Media
          </label>
          
          <button
            className="hover-bg-blue-700 rounded bg-blue-500 px-4 py-2 font-bold text-white"
            onClick={() => widgetRef.current.open()}
          >
            Submit
          </button>
        </form>
 */
