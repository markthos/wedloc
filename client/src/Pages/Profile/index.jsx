// User Profile Page
// TODO: Pull in profile info (first/last name, username, email, profile picture, etc.) and populate the form
// TODO: Setup submit functionality so that the user can update their profile info
// !FIX: Adjust responsive styling so it adjusts more smoothly

import React, { useState, useEffect, useRef } from "react";
import StyledButton from "../../components/StyledButton";
import StyledFormInput from "../../components/StyledFormInput";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DefaultProfileImg from "./img/default_profile.png";
import Button from "@mui/material/Button";

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
    <section className="container m-auto flex h-full items-center justify-center p-5">
      <form className="flex w-full flex-col items-center gap-4 rounded-md bg-beige p-10 shadow-lg md:flex-row">
        {/* 1 col in mobile, 2 columns above the md breakpoint (profile image col is 1/3 width, inputs col is 2/3 width) */}
        <div className="text-center w-full md:w-1/3">
          <img
            className="m-auto mb-5 h-80 w-80 rounded-full object-cover shadow-lg"
            src={DefaultProfileImg}
            alt="User Profile"
          />
          <p>
            <AddAPhotoIcon fontSize="large" />
          </p>

          <StyledButton
            onClick={() => widgetRef.current.open()}
            displayText={"Upload Profile Picture"}
          />
        </div>
        {/* 1 col in mobile, 2 cols above the md breakpoint (label column is 1/4 width, input is 3/4 width) */}
        <div className="flex flex-col w-full md:w-2/3">
          <div className="flex flex-col items-baseline md:gap-4 md:flex-row">
            <div className="w-full md:w-1/6 md:text-right">
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="w-full md:w-5/6">
              <StyledFormInput
                fullWidthStyle
                type={"text"}
                name={"firstName"}
                placeholder={"INSERT FIRST NAME FROM DB"}
              />
            </div>
          </div>

          <div className="flex flex-col items-baseline md:gap-4 md:flex-row">
            <div className="w-full md:w-1/6 md:text-right">
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="w-full md:w-5/6">
              <StyledFormInput
                fullWidthStyle
                type={"text"}
                name={"lastName"}
                placeholder={"INSERT LAST NAME FROM DB"}
              />
            </div>
          </div>

          <div className="flex flex-col items-baseline md:gap-4 md:flex-row">
            <div className="w-full md:w-1/6 md:text-right">
              <label htmlFor="username">Username</label>
            </div>
            <div className="w-full md:w-5/6">
              <StyledFormInput
                fullWidthStyle
                type={"text"}
                name={"username"}
                placeholder={"INSERT USERNAME FROM DB"}
              />
            </div>
          </div>

          <div className="flex flex-col items-baseline md:gap-4 md:flex-row">
            <div className="w-full md:w-1/6 md:text-right">
              <label htmlFor="email">Email</label>
            </div>
            <div className="w-full md:w-5/6">
              <StyledFormInput
                fullWidthStyle
                type={"email"}
                name={"email"}
                placeholder={"INSERT EMAIL FROM DB"}
              />
            </div>
          </div>

          <div className="flex flex-col items-baseline md:gap-4 md:flex-row">
            <div className="w-full md:w-1/6 md:text-right">
              <label htmlFor="password">Password</label>
            </div>
            <div className="w-full md:w-5/6">
              <StyledFormInput
                fullWidthStyle
                type={"password"}
                name={"password"}
                placeholder={"INSERT PASSWORD FROM DB"}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <StyledButton submit primaryColor displayText={"Save Changes"} />
          </div>
        </div>
      </form>
    </section>
  );
}
