import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_IMAGE } from "../../utils/mutations";
import { useParams } from "react-router-dom";

export default function Upload({ cloudName }) {
  const { eventId } = useParams();
  const [image, setImage] = useState(null);
  const [dataURL, setDataURL] = useState("");
  const [uploadImage] = useMutation(UPLOAD_IMAGE);
  const [name, setName] = useState(localStorage.getItem("name") || "");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!image) {
      console.error("No image selected.");
      return;
    }

    try {
      const { data } = await uploadImage({
        variables: { file: image, capsuleId: eventId, owner: name },
      });
      setDataURL(data.uploadImage.secure_url);
      console.log(data.uploadImage);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <main className="bg-main_bg min-h-screen">
      <section className="container m-auto">
        <h1>Upload</h1>
        <form>
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
          {dataURL && <img src={dataURL} alt="Uploaded" />}
          <button
            className="hover-bg-blue-700 rounded bg-blue-500 px-4 py-2 font-bold text-white"
            onClick={handleUpload}
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}
