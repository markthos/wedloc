// User Profile Page

import React, { useState, useEffect, useRef } from "react";
import StyledButton from "../../components/StyledButton";

export default function Profile() {
  //* info for the image upload
  const [dataURL, setDataURL] = useState(""); //! THIS dataURL is the image url that is returned from cloudinary to be saved into the DB
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);
  const saveFolder = `wedloc/userimages`;

  //* This is the useEffect for the image upload
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
    );
  }, [saveFolder]);

  return (
    <section className="min-h-full">
      <h1>Profile</h1>
      <StyledButton onClick={() => widgetRef.current.open()} displayText={"Upload"} primaryColor/>
    </section>
  );
}
