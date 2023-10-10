// Upload page


import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { useEffect, useState } from "react";
import { fill } from "@cloudinary/url-gen/actions/resize";


//!this entire page is currently not working


export default function Upload({ cloudName }) {
  const [img, setImg] = useState("");
  const [myImage, setMyImage] = useState(null);

  useEffect(() => {
    console.log("img", img);
    if (img) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageDataUrl = reader.result;
        const image = new CloudinaryImage(imageDataUrl, {
          cloudName: cloudName,
        }).resize(fill().width(100).height(150));
        setMyImage(image);
      };
      reader.readAsDataURL(img);
    }
  }, [img, cloudName]);

  return (
    <div style={{backgroundColor: 'silver'}}>
      <h1>Upload</h1>
      <input
        type="file"
        onChange={(e) => {
          const selectedFile = e.target.files[0];
          // Ensure that a file is selected
          if (selectedFile) {
            setImg(selectedFile);
          }
        }}
      />
      {myImage && <AdvancedImage cldImg={myImage} />}
    </div>
  );
};
